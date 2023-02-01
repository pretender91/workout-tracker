import { UseCase } from "../../../libs/use-case.js";
import type { Exercise } from "../domain/exercise.js";
import type { ExerciseGateway } from "../infrastructure/exercise.gateway.js";

type UpdateExerciseParams = Pick<Exercise, "id"> & Partial<Exercise>;

type UpdateExerciseContext = {
  exerciseGateway: ExerciseGateway;
};

type UpdateExerciseOutput = Exercise;

export class UpdateExercise extends UseCase<
  UpdateExerciseParams,
  UpdateExerciseContext,
  UpdateExerciseOutput
> {
  public async execute(): Promise<Exercise> {
    return this.context.exerciseGateway.updateExercise(this.params);
  }
}
