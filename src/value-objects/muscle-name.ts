import { EnumValidator } from "../libs/validator/enum-validator.js";
import { ValueObject } from "../libs/value-object/value-object.js";
import { Muscle } from "../modules/exercises/domain/exercise.js";

export class MuscleName extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static fromString(value: string) {
    const muscles = Object.values(Muscle);

    return new EnumValidator<Muscle>(muscles)
      .isEnum()
      .execute(value as Muscle)
      .map(() => new MuscleName(value))
      .getOrThrow();
  }
}
