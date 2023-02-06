import { Entity } from "../../../libs/entity/entity.js";
import type { Id } from "../../../value-objects/id.js";
import type { Quantity } from "../../../value-objects/quantity.js";
import type { Weight } from "../../../value-objects/weight.js";

export class WorkoutBlockExerciseSet extends Entity {
  public workoutBlockExerciseId: Id;
  public order: number;
  public isWarmup: boolean;
  public reps: Quantity;
  public weight: Weight;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(params: WorkoutBlockExerciseSet) {
    super(params.id);

    this.workoutBlockExerciseId = params.workoutBlockExerciseId;
    this.order = params.order;
    this.reps = params.reps;
    this.isWarmup = params.isWarmup;
    this.weight = params.weight;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
