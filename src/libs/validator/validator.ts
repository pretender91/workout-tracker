import { Result } from "../result/result.js";

export type ValidatorResult<ErrorMessage extends string> = Result<
  true,
  ErrorMessage
>;

export type ValidatorRule<T> = (value: T) => boolean;

export class Validator<T, ValidatorMessage extends string> {
  #pairs: [ValidatorMessage, ValidatorRule<T>][] = [];

  constructor(pairs: [ValidatorMessage, ValidatorRule<T>][]) {
    this.#pairs = pairs;
  }

  public addValidation<NewErrorMessage extends string>(
    message: NewErrorMessage,
    rule: ValidatorRule<T>
  ): Validator<T, NewErrorMessage | ValidatorMessage> {
    return new Validator<T, NewErrorMessage | ValidatorMessage>([
      ...this.#pairs,
      [message, rule],
    ]);
  }

  public execute(value: T): ValidatorResult<ValidatorMessage> {
    for (const [message, rule] of this.#pairs) {
      if (!rule(value)) {
        return Result.failure(message);
      }
    }

    return Result.success(true);
  }
}
