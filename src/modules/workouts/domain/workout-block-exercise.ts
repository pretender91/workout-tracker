import { Entity } from "../../../libs/entity/entity.js";
import type { Id } from "../../../value-objects/id.js";

export class WorkoutBlockExercise extends Entity {
  public workoutBlockId: Id;
  public exerciseId: Id;
  public order: number;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(params: WorkoutBlockExercise) {
    super(params.id);

    this.workoutBlockId = params.workoutBlockId;
    this.exerciseId = params.exerciseId;
    this.order = params.order;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
