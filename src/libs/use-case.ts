import { Result, UnwrapSuccessResultRecord } from "./result/result.js";
import { ValidatorAggregateError } from "./validator/validator-aggregate-error.js";

export abstract class UseCase<Params extends {}, Context extends {}, Output> {
  protected context: Readonly<Context>;
  protected params: Readonly<Params>;

  constructor(params: Params, context: Context) {
    this.params = params;
    this.context = context;
  }

  public abstract execute(): Promise<Output>;

  public unwrapParams(): UnwrapSuccessResultRecord<Params> {
    // @ts-ignore
    return Result.all(this.params)
      .mapFailure((errors) => ValidatorAggregateError.fromRecord(errors))
      .getOrThrow();
  }
}
