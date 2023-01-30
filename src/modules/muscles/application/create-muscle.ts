import { UseCase } from "../../../libs/use-case.js";
import type { Muscle } from "../domain/muscle.js";
import type { MuscleGateway } from "../infrastucture/muscle.gateway";

type CreateMuscleParams = Pick<Muscle, "name">;

type CreateMuscleContext = {
  muscleGateway: MuscleGateway;
};

type CreateMuscleOutput = Muscle;

export class CreateMuscle extends UseCase<
  CreateMuscleParams,
  CreateMuscleContext,
  CreateMuscleOutput
> {
  public async execute(): Promise<CreateMuscleOutput> {
    const { name } = this.params;

    return this.context.muscleGateway.createMuscle({ name });
  }
}
