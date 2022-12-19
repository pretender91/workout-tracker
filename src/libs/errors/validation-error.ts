export class ValidationError {
  public path: ReadonlyArray<string>;
  public message: string;

  constructor(path: string[], message: string = "") {
    this.message = message;
    this.path = path;
  }
}
