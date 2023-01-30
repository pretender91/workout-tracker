import type { Id } from "src/value-objects/id.js";
import { UseCase } from "../../../libs/use-case.js";
import type { Exercise } from "../domain/exercise.js";
import type { ExerciseGateway } from "../infrastructure/exercise.gateway.js";

type RemoveExerciseParams = Pick<Exercise, "id">;

type RemoveExeciseContext = {
  exerciseGateway: ExerciseGateway;
};

type RemoveExerciseOutput = Id | null;

export class RemoveExercise extends UseCase<
  RemoveExerciseParams,
  RemoveExeciseContext,
  RemoveExerciseOutput
> {
  public async execute(): Promise<Id | null> {
    const { id } = this.params;

    return this.context.exerciseGateway.removeExercise({ id });
  }
}
