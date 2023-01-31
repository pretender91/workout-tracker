import { Entity } from "../../../libs/entity/entity.js";
import type { ExerciseName } from "../../../value-objects/exercise-name.js";
import type { MuscleName } from "../../../value-objects/muscle-name.js";

type ExerciseParams = Pick<
  Exercise,
  "id" | "createdAt" | "updatedAt" | "name" | "muscles"
>;

export enum Muscle {
  Abdominals = "Abdominals",
  Obliques = "Obliques",
  Forearms = "Forearms",
  Biceps = "Biceps",
  Shoulders = "Shoulders",
  Traps = "Traps",
  Chest = "Chest",
  Quads = "Quads",
  Hamstrings = "Hamstrings",
  Lowerback = "Lowerback",
  Glutes = "Glutes",
  Lats = "Lats",
  Traps_Middle = "Traps_Middle",
  Calves = "Calves",
  Triceps = "Triceps",
}

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
