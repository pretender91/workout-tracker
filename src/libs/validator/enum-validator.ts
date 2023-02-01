import { ValidatorError } from "./validator-error.js";
import { Validator } from "./validator.js";

export class EnumValidator<T> extends Validator<T> {
  private readonly values: T[];

  constructor(values: T[]) {
    super();
    this.values = values;
  }

  public isEnum(
    issue: ValidatorError = ValidatorError.TypeMismatch("enum")
  ): EnumValidator<T> {
    this.addValidation(issue, (value) => this.values.includes(value));
    return this;
  }
}
