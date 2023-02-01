import prismaClient from "../../../prisma-client.js";
import type { ExerciseName } from "../../../value-objects/exercise-name.js";
import { Id } from "../../../value-objects/id.js";
import type { Exercise, Muscle } from "../domain/exercise.js";
import type { ExerciseMapper } from "./exercise.mapper.js";

export interface ExerciseGateway {
  createExercise(params: Pick<Exercise, "name" | "muscles">): Promise<Exercise>;

  updateExercise(
    params: Pick<Exercise, "id"> & Partial<Exercise>
  ): Promise<Exercise>;

  removeExercise(params: Pick<Exercise, "id">): Promise<Id | null>;

  findById(params: Pick<Exercise, "id">): Promise<Exercise | null>;
  checkExerciseNameExists(name: ExerciseName): Promise<boolean>;
}

export class PrismaExerciseGateway implements ExerciseGateway {
  private exerciseMapper: ExerciseMapper;

  constructor(params: { exerciseMapper: ExerciseMapper }) {
    this.exerciseMapper = params.exerciseMapper;
  }

  async checkExerciseNameExists(name: ExerciseName): Promise<boolean> {
    const exercise = await prismaClient.exercise.findUnique({
      where: {
        name: name.valueOf(),
      },
    });

    return !!exercise;
  }
  async createExercise(
    params: Pick<Exercise, "name" | "muscles">
  ): Promise<Exercise> {
    const exerciseDTO = await prismaClient.exercise.create({
      data: {
        id: Id.generate().valueOf(),
        name: params.name.valueOf(),
        muscles: params.muscles.map((muscle) => muscle.valueOf() as Muscle),
      },
    });

    const exercise = this.exerciseMapper.toDomain(exerciseDTO);

    return exercise;
  }

  async updateExercise(
    params: Pick<Exercise, "id"> & Partial<Exercise>
  ): Promise<Exercise> {
    const { id, muscles, ...exerciseToUpdate } = params;
    const exerciseDTO = await prismaClient.exercise.update({
      where: {
        id: id.valueOf(),
      },
      data: {
        ...exerciseToUpdate,
        muscles: muscles?.map((muscle) => muscle.valueOf() as Muscle) ?? [],
        name: exerciseToUpdate.name?.valueOf(),
      },
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
