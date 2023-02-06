import { Entity } from "../../../libs/entity/entity.js";
import type { Id } from "../../../value-objects/id.js";
import type { User } from "../../users/domain/user.js";

type WorkoutParams = Pick<
  Workout,
  "id" | "date" | "userId" | "createdAt" | "updatedAt"
>;

export class Workout extends Entity {
  public date: Date;
  public userId: Id;
  public createdAt: Date;
  public updatedAt: Date;

  public isCreatedBy(user: Pick<User, "id">): boolean {
    return this.userId.equals(user.id);
  }

  constructor(params: WorkoutParams) {
    super(params.id);

    this.date = params.date;
    this.userId = params.userId;

    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
