import { ValidatorError } from "../libs/validator/validator-error.js";
import { ValueObject } from "../libs/value-object/value-object.js";

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

const MuscleValues = new Set<string>([
  Muscle.Glutes,
  Muscle.Hamstrings,
  Muscle.Quads,
  Muscle.Chest,
  Muscle.Shoulders,
  Muscle.Traps,
  Muscle.Traps_Middle,
  Muscle.Biceps,
  Muscle.Triceps,
  Muscle.Forearms,
  Muscle.Abdominals,
  Muscle.Obliques,
  Muscle.Lowerback,
  Muscle.Lats,
  Muscle.Calves,
]);

function isMuscle(value: unknown): value is Muscle {
  return typeof value === "string" && MuscleValues.has(value);
}

export class MuscleName extends ValueObject<Muscle> {
  private constructor(value: Muscle) {
    super(value);
  }

  public static fromString(value: string) {
    if (!isMuscle(value)) {
      throw ValidatorError.TypeMismatch(
        "Muscle",
        `"${value}" is not a "Muscle"`
      );
    }

    return new MuscleName(value);
  }
}
