import type { UseCase } from "../../../libs/use-case.js";
import type { Exercise } from "../domain/exercise.js";
import type { ExerciseGateway } from "../infrastructure/exercise.gateway.js";

type FindExerciseByIdParams = Pick<Exercise, "id">;

type FindExerciseByIdContext = {
  exerciseGateway: ExerciseGateway;
};

type FindExerciseByIdOutput = Exercise | null;

export class FindExerciseById
  implements UseCase<FindExerciseByIdParams, FindExerciseByIdOutput>
{
  private context: FindExerciseByIdContext;

  constructor(context: FindExerciseByIdContext) {
    this.context = context;
  }

  public async execute({
    id,
  }: FindExerciseByIdParams): Promise<FindExerciseByIdOutput> {
    return this.context.exerciseGateway.findById({ id });
  }
}
