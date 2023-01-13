import type { ValidatorError } from "./validator-error.js";

export class ValidatorAggregateError extends AggregateError {
  public override readonly name = "ValidatorAggregateError";

  constructor(errors: ValidatorError[]) {
    super(errors);
  }

  public static fromRecord(
    record: Record<string, ValidatorError>
  ): ValidatorAggregateError {
    return new ValidatorAggregateError(
      Object.entries(record).map(([path, error]) => {
        error.path.push(path);
        return error;
      })
    );
  }
}
