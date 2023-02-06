import type { Context } from "../../../context.js";
import {
  BackwardPaginationParams,
  Connection,
  ForwardPaginationParams,
  PaginationParams,
} from "../../../libs/pagination.js";
import { Id } from "../../../value-objects/id.js";
import type { Workout } from "../domain/workout.js";
import type { WorkoutDTO } from "./wokrout.dto.js";

type CreateParams = Pick<Workout, "date" | "userId">;
type UpdateParams = Pick<Workout, "id"> &
  Partial<Pick<Workout, "date" | "updatedAt">>;
type FindByIdParams = Pick<Workout, "id">;
type FindAllParams = {
  pagination: PaginationParams;
  filter: Partial<
    Pick<Workout, "userId"> & { dateBefore: Date; dateAfter: Date }
  >;
};
type RemoveByIdParams = Pick<Workout, "id">;

export interface WorkoutGateway {
  create(params: CreateParams): Promise<Workout>;
  update(params: UpdateParams): Promise<Workout>;
  findById(params: FindByIdParams): Promise<Workout | null>;
  findAll(params: FindAllParams): Promise<Connection<Workout>>;
  removeById(params: RemoveByIdParams): Promise<void>;
}

export class PrismaWorkoutGateway implements WorkoutGateway {
  constructor(
    private readonly context: Pick<Context, "prisma" | "workoutMapper">
  ) {}

  public async create(params: CreateParams): Promise<Workout> {
    const workoutDTO = await this.context.prisma.workout.create({
      data: {
        id: Id.generate().valueOf(),
        date: params.date,
        userId: params.userId.valueOf(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return this.context.workoutMapper.toDomain(workoutDTO);
  }

  public async findById(params: Pick<Workout, "id">): Promise<Workout | null> {
    const workoutDTO = await this.context.prisma.workout.findUnique({
      where: {
        id: params.id.valueOf(),
      },
    });

    return workoutDTO ? this.context.workoutMapper.toDomain(workoutDTO) : null;
  }

  public async findAll(params: FindAllParams): Promise<Connection<Workout>> {
    const { pagination, filter } = params;
    let dtos: WorkoutDTO[] = [];
    let take = 0;
    let hasNextPage = false;
    let hasPreviousPage = false;

    const where = {
      userId: filter?.userId?.valueOf() ?? undefined,
      date:
        filter?.dateAfter || filter?.dateBefore
          ? {
              gte: filter?.dateAfter ?? undefined,
              lte: filter?.dateBefore ?? undefined,
            }
          : undefined,
    };

    let totalCount = await this.context.prisma.workout.count({
      where,
    });

    if (pagination instanceof ForwardPaginationParams) {
      take = pagination.first.valueOf() + 1;
      dtos = await this.context.prisma.workout.findMany({
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

      dtos = await this.context.prisma.workout.findMany({
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

    const entities = this.context.workoutMapper.toDomainArray(
      dtos.slice(0, take - 1)
    );

    return Connection.fromEntities({
      entities,
      totalCount,
      hasNextPage,
      hasPreviousPage,
    });
  }

  public async update(params: UpdateParams): Promise<Workout> {
    const workoutDTO = await this.context.prisma.workout.update({
      where: {
        id: params.id.valueOf(),
      },
      data: {
        date: params.date,
        updatedAt: params.updatedAt ?? new Date(),
      },
    });

    return this.context.workoutMapper.toDomain(workoutDTO);
  }

  public async removeById(params: Pick<Workout, "id">): Promise<void> {
    await this.context.prisma.workout.delete({
      where: {
        id: params.id.valueOf(),
      },
    });
  }
}
