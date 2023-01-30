import { UseCase } from "../../../libs/use-case.js";
import type { Muscle } from "../domain/muscle.js";
import type { MuscleGateway } from "../infrastucture/muscle.gateway.js";

type UpdateMuscleParams = Pick<Muscle, "id"> & Partial<Muscle>;

type UpdateMuscleContext = {
  muscleGateway: MuscleGateway;
};

type UpdateMuscleOutput = Muscle;

export class UpdateMuscle extends UseCase<
  UpdateMuscleParams,
  UpdateMuscleContext,
  UpdateMuscleOutput
> {
  public async execute(): Promise<UpdateMuscleOutput> {
    return this.context.muscleGateway.updateMuscle(this.params);
  }
}
