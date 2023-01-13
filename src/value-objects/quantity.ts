import { NumberValidator } from "../libs/validator/number-validator.js";
import { ValueObject } from "../libs/value-object/value-object.js";

export class Quantity extends ValueObject<number> {
  private constructor(value: number) {
    super(value);
  }

  public override toString() {
    return `${this.valueOf()}`;
  }

  public static fromNumber(value: number) {
    return new NumberValidator()
      .min(0)
      .execute(value)
      .map(() => {
        return new Quantity(value);
      })
      .getOrThrow();
  }
}
