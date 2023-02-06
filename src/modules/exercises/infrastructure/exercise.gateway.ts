import type { Context } from "../../../context.js";
import {
  BackwardPaginationParams,
  Connection,
  ForwardPaginationParams,
  PaginationParams,
} from "../../../libs/pagination.js";
import type { ExerciseName } from "../../../value-objects/exercise-name.js";
import { Id } from "../../../value-objects/id.js";
import type { Exercise } from "../domain/exercise.js";
import type { ExerciseDTO } from "./exercise.dto.js";

type CreateExerciseParams = Pick<Exercise, "name" | "muscles" | "createdById">;
type UpdateExerciseParams = Pick<Exercise, "id"> &
  Partial<Pick<Exercise, "name" | "muscles">>;
type FindExercisesFilter = Partial<
  Pick<Exercise, "name" | "muscles" | "createdById">
>;

export interface ExerciseGateway {
  createExercise(params: CreateExerciseParams): Promise<Exercise>;

  updateExercise(params: UpdateExerciseParams): Promise<Exercise>;

  removeExercise(params: Pick<Exercise, "id">): Promise<Id | null>;

  findById(params: Pick<Exercise, "id">): Promise<Exercise | null>;

  findExercises(
    pagination: PaginationParams,
    filter?: FindExercisesFilter
  ): Promise<Connection<Exercise>>;

  checkExerciseNameExists(name: ExerciseName): Promise<boolean>;
}

type PrismaExerciseGatewayContext = Pick<Context, "exerciseMapper" | "prisma">;

export class PrismaExerciseGateway implements ExerciseGateway {
  private context: PrismaExerciseGatewayContext;

  constructor(context: PrismaExerciseGatewayContext) {
    this.context = context;
  }

  async checkExerciseNameExists(name: ExerciseName): Promise<boolean> {
    const exercise = await this.context.prisma.exercise.findUnique({
      where: {
        name: name.valueOf(),
      },
    });

    return !!exercise;
  }

  async createExercise(params: CreateExerciseParams): Promise<Exercise> {
    const exerciseDTO = await this.context.prisma.exercise.create({
      data: {
        id: Id.generate().valueOf(),
        name: params.name.valueOf(),
        muscles: params.muscles.map((muscle) => muscle.valueOf()),
        createdById: params.createdById.valueOf(),
      },
    });

    return this.context.exerciseMapper.toDomain(exerciseDTO);
  }

  async updateExercise(params: UpdateExerciseParams): Promise<Exercise> {
    const { id, muscles, name } = params;
    const exerciseDTO = await this.context.prisma.exercise.update({
      where: {
        id: id.valueOf(),
      },
      data: {
        muscles: muscles?.map((muscle) => muscle.valueOf()),
        name: name?.valueOf(),
      },
    });
    return this.context.exerciseMapper.toDomain(exerciseDTO);
  }

  async removeExercise(params: Pick<Exercise, "id">): Promise<Id | null> {
    await this.context.prisma.exercise.delete({
      where: {
        id: params.id.valueOf(),
      },
    });

    return params.id;
  }

  async findById(params: Pick<Exercise, "id">): Promise<Exercise | null> {
    const exerciseDTO = await this.context.prisma.exercise.findUnique({
      where: {
        id: params.id.valueOf(),
      },
    });

    if (!exerciseDTO) {
      return null;
    }

    return this.context.exerciseMapper.toDomain(exerciseDTO);
  }

  public async findExercises(
    pagination: PaginationParams,
    filter?: FindExercisesFilter
  ): Promise<Connection<Exercise>> {
    let dtos: ExerciseDTO[] = [];
    let take = 0;
    let hasNextPage = false;
    let hasPreviousPage = false;

    const where = {
      name: filter?.name
        ? { contains: filter.name.valueOf().toLowerCase() }
        : undefined,
      muscles: filter?.muscles
        ? {
            hasEvery: filter.muscles.map((muscle) => muscle.valueOf()),
          }
        : undefined,
      createdById: filter?.createdById
        ? filter.createdById.valueOf()
        : undefined,
    };

    let totalCount = await this.context.prisma.exercise.count({
      where,
    });

    if (pagination instanceof ForwardPaginationParams) {
      take = pagination.first.valueOf() + 1;
      dtos = await this.context.prisma.exercise.findMany({
        where,
        take: take,
        skip: pagination.after ? 1 : 0,
        cursor: pagination.after
          ? {
              id: pagination.after.valueOf(),
            }
          : undefined,
        orderBy: {
          createdAt: "asc",
        },
      });

      hasNextPage = dtos.length > pagination.first.valueOf();
    }

    if (pagination instanceof BackwardPaginationParams) {
      take = pagination.last.valueOf() + 1;

      dtos = await this.context.prisma.exercise.findMany({
        where,
        take: take,
        skip: pagination.before ? 1 : 0,
        cursor: pagination.before
          ? {
              id: pagination.before.valueOf(),
            }
          : undefined,
        orderBy: {
          createdAt: "desc",
        },
      });

      hasPreviousPage = dtos.length > pagination.last.valueOf();
    }

    const entities = this.context.exerciseMapper.toDomainArray(
      dtos.slice(0, take - 1)
    );

    return Connection.fromEntities({
      entities,
      hasNextPage,
      hasPreviousPage,
      totalCount,
    });
  }
}
