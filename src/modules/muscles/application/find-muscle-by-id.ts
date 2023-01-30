import { UseCase } from "../../../libs/use-case.js";
import type { Muscle } from "../domain/muscle.js";
import type { MuscleGateway } from "../infrastucture/muscle.gateway";

type FindMuscleByIdParams = Pick<Muscle, "id">;

type FindMuscleByIdContext = {
  muscleGateway: MuscleGateway;
};

type FindMuscleByIdOutput = Muscle | null;

export class FindMuscleById extends UseCase<
  FindMuscleByIdParams,
  FindMuscleByIdContext,
  FindMuscleByIdOutput
> {
  public async execute(): Promise<FindMuscleByIdOutput> {
    const { id } = this.params;

    return this.context.muscleGateway.findById({ id });
  }
}
