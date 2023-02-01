import { Entity } from "../../../libs/entity/entity.js";
import type { ExerciseName } from "../../../value-objects/exercise-name.js";
import type { MuscleName } from "../../../value-objects/muscle-name.js";

type ExerciseParams = Pick<
  Exercise,
  "id" | "createdAt" | "updatedAt" | "name" | "muscles"
>;

export class Exercise extends Entity {
  public name: ExerciseName;
  public createdAt: Date;
  public updatedAt: Date;
  public muscles: MuscleName[];

  constructor(params: ExerciseParams) {
    super(params.id);

    this.name = params.name;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.muscles = params.muscles;
  }
}
