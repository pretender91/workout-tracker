interface ResultCommon<T, E> {
  getOrNull(): T | null;

  exceptionOrNull(): E | null;

  fold<R>(onSuccess: (value: T) => R, onFailure: (error: E) => R): R;

  map<R>(transform: (value: T) => R): Result<R, E>;

  mapFailure<R>(transform: (error: E) => R): Result<T, R>;

  getOrDefault(defaultValue: T): T;

  getOrElse(elseF: (error: E) => T): T;

  getOrThrow(): T;

  onSuccess(action: (value: T) => void): Result<T, E>;

  onFailure(action: (error: E) => void): Result<T, E>;

  on(actionsMap: {
    success: (value: T) => void;
    failure: (error: E) => void;
  }): Result<T, E>;
}

interface SuccessResult<T, E> extends ResultCommon<T, E> {
  readonly isSuccess: true;
  readonly isFailure: false;
  readonly value: T;
}

interface FailureResult<T, E> extends ResultCommon<T, E> {
  readonly isSuccess: false;
  readonly isFailure: true;
  readonly error: E;
}

export type UnwrapSuccessResult<T> = T extends Result<infer U, any> ? U : never;
export type UnwrapFailureResult<T> = T extends Result<any, infer U> ? U : never;

export type UnwrapSuccessResultRecord<T> = T extends {}
  ? {
      [K in keyof T]: UnwrapSuccessResult<T[K]>;
    }
  : never;

export type UnwrapFailureResultRecord<T> = T extends {}
  ? {
      [K in keyof T]: UnwrapFailureResult<T[K]>;
    }
  : never;

export type AllResult<T> = T extends {}
  ? Result<UnwrapSuccessResultRecord<T>, UnwrapFailureResultRecord<T>>
  : never;

class FailureResultImp<E> implements FailureResult<any, E> {
  readonly isSuccess = false;
  readonly isFailure = true;

  constructor(readonly error: E) {}

  getOrDefault(defaultValue: any) {
    return defaultValue;
  }

  getOrNull() {
    return null;
  }

  getOrElse(elseF: (error: E) => any): any {
    return elseF(this.error);
  }

  getOrThrow(): any {
    throw this.error;
  }

  exceptionOrNull(): E | null {
    return this.error;
  }

  fold<R>(_onSuccess: (value: any) => R, onFailure: (error: E) => R): R {
    return onFailure(this.error);
  }

  map<R>(_transform: (value: any) => R): Result<R, E> {
    return this;
  }

  mapFailure<R>(transform: (error: E) => R): Result<any, R> {
    return new FailureResultImp(transform(this.error));
  }

  onSuccess(_action: (value: any) => void): Result<any, E> {
    return this;
  }

  onFailure(action: (error: E) => void): Result<any, E> {
    action(this.error);
    return this;
  }

  on(actionsMap: {
    success: (value: any) => void;
    failure: (error: E) => void;
  }): Result<any, E> {
    actionsMap.failure(this.error);
    return this;
  }
}

class SuccessResultImp<T> implements SuccessResult<T, any> {
  readonly isSuccess = true;
  readonly isFailure = false;

  constructor(readonly value: T) {}

  exceptionOrNull() {
    return null;
  }

  getOrNull(): T | null {
    return this.value;
  }

  getOrDefault(_defaultValue: T): T {
    return this.value;
  }

  getOrElse(_elseF: (error: any) => T): T {
    return this.value;
  }

  getOrThrow(): T {
    return this.value;
  }

  map<R>(transform: (value: T) => R): Result<R, any> {
    return new SuccessResultImp(transform(this.value));
  }

  mapFailure<R>(_transform: (error: any) => R): Result<T, R> {
    return this;
  }

  fold<R>(onSuccess: (value: T) => R, _onFailure: (error: any) => R): R {
    return onSuccess(this.value);
  }

  onSuccess(action: (value: T) => void): Result<T, any> {
    action(this.value);
    return this;
  }

  onFailure(_action: (error: any) => void): Result<T, any> {
    return this;
  }

  on(actionsMap: {
    success: (value: T) => void;
    failure: (error: any) => void;
  }): Result<T, any> {
    actionsMap.success(this.value);
    return this;
  }
}

export type Result<T, E> = SuccessResult<T, E> | FailureResult<T, E>;

export const Result = {
  success<T>(value: T): Result<T, any> {
    return new SuccessResultImp(value);
  },
  failure<E>(error: E): Result<any, E> {
    return new FailureResultImp(error);
  },
  all<T extends Record<string, Result<any, any>>>(results: T): AllResult<T> {
    const errors: Record<string, any> = {};
    const values: Record<string, any> = {};

    for (const [key, result] of Object.entries(results)) {
      if (result.isFailure) {
        errors[key] = result.error;
      } else {
        values[key] = result.value;
      }
    }

    if (Object.keys(errors).length > 0) {
      return Result.failure(errors) as AllResult<T>;
    } else {
      return Result.success(values) as AllResult<T>;
    }
  },
};
