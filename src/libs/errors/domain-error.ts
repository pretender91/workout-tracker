export class WorkoutTrackerError<Type extends string> {
  /**
   * Human readable error message.
   */
  public readonly message: string;
  /**
   * Error brand tag. Should use the same value as the class name.
   */
  public readonly type: Type;

  constructor(type: Type, message: string) {
    this.message = message;
    this.type = type;
  }
}
