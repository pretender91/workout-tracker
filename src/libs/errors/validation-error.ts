export class ValidationError {
  public path: ReadonlyArray<string>;
  public message: string;

  constructor(path: string[], message: string = "") {
    this.message = message;
    this.path = path;
  }

  static aggregate(errorsMap: Record<string, Error>, message: string): AggregateError {
    return new AggregateError(
      Object.entries(errorsMap).map(
        ([key, error]) => new ValidationError([key], error.message)
      ),
      message
    );
  }
}
