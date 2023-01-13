import { Result } from "../result/result.js";
import type { ValidatorError } from "./validator-error.js";

export type ValidatorResult = Result<true, ValidatorError>;

export type ValidatorRule<T> = (value: T) => boolean;

export class Validator<T> {
  private readonly pairs: [ValidatorError, ValidatorRule<T>][] = [];

  constructor(pairs: [ValidatorError, ValidatorRule<T>][] = []) {
    this.pairs = pairs;
  }

  public addValidation(
    issue: ValidatorError,
    rule: ValidatorRule<T>
  ): Validator<T> {
    this.pairs.push([issue, rule]);
    return this;
  }

  public execute(value: T): ValidatorResult {
    for (const [issue, rule] of this.pairs) {
      if (!rule(value)) {
        return Result.failure(issue) as ValidatorResult;
      }
    }

    return Result.success(true) as ValidatorResult;
  }
}
