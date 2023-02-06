import { Entity } from "../../../libs/entity/entity.js";
import type { Id } from "../../../value-objects/id.js";

export class WorkoutBlock extends Entity {
  public workoutId: Id;

  public order: number;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(params: WorkoutBlock) {
    super(params.id);

    this.workoutId = params.workoutId;
    this.order = params.order;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
