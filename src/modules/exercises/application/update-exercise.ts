import type { UseCase } from "../../../libs/use-case.js";
import type { Exercise } from "../domain/exercise.js";
import type { ExerciseGateway } from "../infrastructure/exercise.gateway.js";

type UpdateExerciseParams = Pick<Exercise, "id"> & Partial<Exercise>;

type UpdateExerciseContext = {
  exerciseGateway: ExerciseGateway;
};

type UpdateExerciseOutput = Exercise;

export class UpdateExercise
  implements UseCase<UpdateExerciseParams, UpdateExerciseOutput>
{
  private context: UpdateExerciseContext;

  constructor(context: UpdateExerciseContext) {
    this.context = context;
  }

  public async execute(
    params: UpdateExerciseParams
  ): Promise<UpdateExerciseOutput> {
    return this.context.exerciseGateway.updateExercise(params);
  }
}
