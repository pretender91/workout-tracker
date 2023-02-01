import type { Connection, PaginationParams } from "../../../libs/pagination.js";
import type { UseCaseV2 } from "../../../libs/use-case.js";
import type { Exercise } from "../domain/exercise.js";
import type { ExerciseGateway } from "../infrastructure/exercise.gateway.js";

type FindExercisesFilter = Partial<
  Pick<Exercise, "createdById" | "name" | "muscles">
>;

type Input = {
  filter: FindExercisesFilter;
  pagination: PaginationParams;
};

type Output = Connection<Exercise>;

export class FindExercises implements UseCaseV2<Input, Output> {
  private readonly exerciseGateway: ExerciseGateway;

  constructor(context: { exerciseGateway: ExerciseGateway }) {
    this.exerciseGateway = context.exerciseGateway;
  }

  public async execute(input: Input): Promise<Output> {
    return this.exerciseGateway.findExercises(input.pagination, input.filter);
  }
}
