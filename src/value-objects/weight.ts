import { NumberValidator } from "../libs/validator/number-validator.js";
import { ValueObject } from "../libs/value-object/value-object.js";

export class Weight extends ValueObject<number> {
  private constructor(value: number) {
    super(value);
  }

  public static fromNumber(value: number): Weight {
    return new NumberValidator()
      .min(0)
      .execute(value)
      .map(() => new Weight(value))
      .getOrThrow();
  }
}
