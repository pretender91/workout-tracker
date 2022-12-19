import { Entity } from "../../../libs/entity/entity.js";
import type { User } from "../../users/domain/user.js";

type WorkoutParams = Pick<Workout, "id" | "athlete">;

export class Workout extends Entity {
  public athlete: User;

  constructor(params: WorkoutParams) {
    super(params.id);

    this.athlete = params.athlete;
  }
}
