import prismaClient from "../../../prisma-client.js";
import { Id } from "../../../value-objects/id.js";
import type { Exercise } from "../domain/exercise.js";
import type { ExerciseMapper } from "./exercise.mapper.js";

export interface ExerciseGateway {
  createExercise(params: Pick<Exercise, "name">): Promise<Exercise>;

  updateExercise(
    params: Pick<Exercise, "id"> & Partial<Exercise>
  ): Promise<Exercise>;

  removeExercise(params: Pick<Exercise, "id">): Promise<Id | null>;

  findById(params: Pick<Exercise, "id">): Promise<Exercise | null>;
}

export class PrismaExerciseGateway implements ExerciseGateway {
  private exerciseMapper: ExerciseMapper;

  constructor(params: { exerciseMapper: ExerciseMapper }) {
    this.exerciseMapper = params.exerciseMapper;
  }
  async createExercise(params: Pick<Exercise, "name">): Promise<Exercise> {
    const exerciseDTO = await prismaClient.exercise.create({
      data: {
        id: Id.generate().valueOf(),
        name: params.name,
      },
    });

    const exercise = this.exerciseMapper.toDomain(exerciseDTO);

    return exercise;
  }

  async updateExercise(
    params: Pick<Exercise, "id"> & Partial<Exercise>
  ): Promise<Exercise> {
    const { id, ...exerciseToUpdate } = params;
    const exerciseDTO = await prismaClient.exercise.update({
      where: {
        id: id.valueOf(),
      },
      data: exerciseToUpdate,
    });
    const exercise = this.exerciseMapper.toDomain(exerciseDTO);

    return exercise;
  }

  async removeExercise(params: Pick<Exercise, "id">): Promise<Id | null> {
    await prismaClient.exercise.delete({
      where: {
        id: params.id.valueOf(),
      },
    });

    return params.id;
  }
  async findById(params: Pick<Exercise, "id">): Promise<Exercise | null> {
    const exerciseDTO = await prismaClient.exercise.findUnique({
      where: {
        id: params.id.valueOf(),
      },
    });

    if (!exerciseDTO) {
      return null;
    }

    const exercise = this.exerciseMapper.toDomain(exerciseDTO);

    return exercise;
  }
}
