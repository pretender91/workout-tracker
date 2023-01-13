import { ValidatorError } from "./validator-error.js";
import { Validator } from "./validator.js";

export class NumberValidator extends Validator<number> {
  public min(
    min: number,
    issue: ValidatorError = ValidatorError.RangeUnderflow(0)
  ): NumberValidator {
    this.addValidation(issue, (value) => value >= min);
    return this;
  }
}
