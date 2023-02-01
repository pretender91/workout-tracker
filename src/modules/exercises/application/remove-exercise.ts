import type { Id } from "src/value-objects/id.js";
import type { UseCase } from "../../../libs/use-case.js";
import type { Exercise } from "../domain/exercise.js";
import type { ExerciseGateway } from "../infrastructure/exercise.gateway.js";

type RemoveExerciseParams = Pick<Exercise, "id">;

type RemoveExeciseContext = {
  exerciseGateway: ExerciseGateway;
};

type RemoveExerciseOutput = Id | null;

export class RemoveExercise
  implements UseCase<RemoveExerciseParams, RemoveExerciseOutput>
{
  private context: RemoveExeciseContext;

  constructor(context: RemoveExeciseContext) {
    this.context = context;
  }

  public async execute({
    id,
  }: RemoveExerciseParams): Promise<RemoveExerciseOutput> {
    if (!id) {
      throw new Error("Id not provided");
    }
    return this.context.exerciseGateway.removeExercise({ id });
  }
}
