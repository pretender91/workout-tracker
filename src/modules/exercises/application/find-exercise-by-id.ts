import { UseCase } from "../../../libs/use-case.js";
import type { Exercise } from "../domain/exercise.js";
import type { ExerciseGateway } from "../infrastructure/exercise.gateway.js";

type FindExerciseByIdParams = Pick<Exercise, "id">;

type FindExerciseByIdContext = {
  exerciseGateway: ExerciseGateway;
};

type FindExerciseByIdOutput = Exercise | null;

export class FindExerciseById extends UseCase<
  FindExerciseByIdParams,
  FindExerciseByIdContext,
  FindExerciseByIdOutput
> {
  public async execute(): Promise<FindExerciseByIdOutput> {
    const { id } = this.params;

    return this.context.exerciseGateway.findById({ id });
  }
}
