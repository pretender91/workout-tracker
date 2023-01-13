import { ValidatorError } from "./validator-error.js";
import { Validator } from "./validator.js";

export class StringValidator extends Validator<string> {
  public isRequired(
    issue: ValidatorError = ValidatorError.ValueMissing()
  ): StringValidator {
    this.addValidation(issue, (value) => value.length > 0);
    return this;
  }

  public minLength(
    length: number,
    issue: ValidatorError = ValidatorError.TooShort(length)
  ): StringValidator {
    this.addValidation(issue, (value) => value.length >= length);
    return this;
  }

  public maxLength(
    length: number,
    issue: ValidatorError = ValidatorError.TooLong(length)
  ): StringValidator {
    this.addValidation(issue, (value) => value.length <= length);
    return this;
  }

  public isEmail(
    issue: ValidatorError = ValidatorError.TypeMismatch("email")
  ): StringValidator {
    this.addValidation(issue, (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    );
    return this;
  }

  public isFinancial(
    issue: ValidatorError = ValidatorError.TypeMismatch("financial")
  ): StringValidator {
    this.addValidation(issue, (value) => /^[0-9]+[.,]?[0-9]{0,2}$/.test(value));
    return this;
  }

  public isNotEqualTo(
    target: string,
    issue: ValidatorError = ValidatorError.ValueExclusionError([target])
  ): StringValidator {
    this.addValidation(issue, (value) => target !== value);
    return this;
  }

  public isEqualTo(
    target: string,
    issue: ValidatorError = ValidatorError.ValueInclusionError([target])
  ): StringValidator {
    this.addValidation(issue, (value) => target === value);
    return this;
  }

  public hasPattern(
    pattern: string | RegExp,
    issue: ValidatorError = ValidatorError.PatternMismatch(pattern.toString())
  ): StringValidator {
    this.addValidation(issue, (value) => new RegExp(pattern).test(value));
    return this;
  }
}
