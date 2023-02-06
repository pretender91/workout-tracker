export class NotFoundError extends Error {
  constructor() {
    super("Not found");
    this.name = "NotFoundError";
  }

  public static assert(condition: boolean): asserts condition {
    if (!condition) throw new NotFoundError();
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized");
    this.name = "UnauthorizedError";
  }

  public static assert(condition: boolean): asserts condition {
    if (!condition) throw new UnauthorizedError();
  }
}

export class UnauthenticatedError extends Error {
  constructor() {
    super("Unauthenticated");
    this.name = "UnauthenticatedError";
  }

  public static assert(condition: boolean): asserts condition {
    if (!condition) throw new UnauthenticatedError();
  }
}
