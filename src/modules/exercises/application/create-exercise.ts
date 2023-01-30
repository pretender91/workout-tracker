import { UseCase } from "../../../libs/use-case.js";
import type { Exercise } from "../domain/exercise.js";
import type { ExerciseGateway } from "../infrastructure/exercise.gateway.js";

type CreateExerciseParams = Pick<Exercise, "name">;

type CreateExeciseContext = {
  exerciseGateway: ExerciseGateway;
};

type CreateExerciseOutput = Exercise;

export class CreateExercise extends UseCase<
  CreateExerciseParams,
  CreateExeciseContext,
  CreateExerciseOutput
> {
  public async execute(): Promise<CreateExerciseOutput> {
    const { name } = this.params;

    return this.context.exerciseGateway.createExercise({ name });
  }
}
