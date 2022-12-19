import { Entity } from "../../../libs/entity/entity.js";
import type { ExerciseName } from "./exercise-name.js";

type ExerciseParams = Pick<Exercise, "id" | "name">;

export class Exercise extends Entity {
  public name: ExerciseName;

  constructor(params: ExerciseParams) {
    super(params.id);
    this.name = params.name;
  }
}
