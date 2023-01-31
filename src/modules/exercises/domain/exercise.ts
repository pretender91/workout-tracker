import { Entity } from "../../../libs/entity/entity.js";

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
  public name: string;
  public createdAt: Date;
  public updatedAt: Date;
  public muscles: Muscle[];

  constructor(params: ExerciseParams) {
    super(params.id);

    this.name = params.name;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.muscles = [];
  }
}
