import { UseCase } from "../../../libs/use-case.js";
import type { Id } from "../../../value-objects/id.js";
import type { Muscle } from "../domain/muscle.js";
import type { MuscleGateway } from "../infrastucture/muscle.gateway.js";

type RemoveMuscleParams = Pick<Muscle, "id">;

type RemoveMuscleContext = {
  muscleGateway: MuscleGateway;
};

type RemoveMuscleOutput = Id | null;

export class RemoveMuscle extends UseCase<
  RemoveMuscleParams,
  RemoveMuscleContext,
  RemoveMuscleOutput
> {
  public async execute(): Promise<RemoveMuscleOutput> {
    const { id } = this.params;

    return this.context.muscleGateway.removeMuscle({ id });
  }
}
