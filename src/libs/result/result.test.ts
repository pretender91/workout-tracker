import { assert, describe, it } from "vitest";
import { Result } from "./result.js";

describe("Result", () => {
  it("should be able to create a success result", () => {
    const result = Result.success(1);
    assert.equal(result.isSuccess, true);
    assert.equal(result.isFailure, false);
    assert.equal(result.getOrNull(), 1);
    assert.equal(result.getOrDefault(2), 1);
    assert.equal(
      result.getOrElse(() => 2),
      1
    );
    assert.equal(result.getOrThrow(), 1);
    assert.equal(result.exceptionOrNull(), null);
    assert.equal(
      result.fold(
        (value) => value,
        () => 2
      ),
      1
    );
    assert.equal(result.map((value) => value + 1).getOrThrow(), 2);

    let successCallbackCallsCount = 0;

    result.onSuccess(() => {
      successCallbackCallsCount++;
    });

    assert.equal(successCallbackCallsCount, 1);

    result.onFailure(() => {
      successCallbackCallsCount++;
    });

    assert.equal(successCallbackCallsCount, 1);
  });

  it("should be able to create a failure result", () => {
    const error = new Error("test");
    const result = Result.failure(error);
    assert.equal(result.isSuccess, false);
    assert.equal(result.isFailure, true);
    assert.equal(result.getOrNull(), null);
    assert.equal(result.getOrDefault(2), 2);
    assert.equal(
      result.getOrElse(() => 2),
      2
    );
    assert.throws(() => result.getOrThrow());
    assert.equal(result.exceptionOrNull(), error);
    assert.equal(
      result.fold(
        (value) => value,
        () => 2
      ),
      2
    );
    assert.equal(result.map((value) => value + 1).exceptionOrNull(), error);

    let failureCallbackCallsCount = 0;

    result.onFailure(() => {
      failureCallbackCallsCount++;
    });

    assert.equal(failureCallbackCallsCount, 1);

    result.onSuccess(() => {
      failureCallbackCallsCount++;
    });

    assert.equal(failureCallbackCallsCount, 1);
  });

  it("should be able to batch success results", () => {
    const results = Result.all({
      email: Result.success("email"),
      password: Result.success("password"),
    });

    assert.equal(results.isSuccess, true);
    assert.equal(results.isFailure, false);
    assert.deepStrictEqual(results.getOrThrow(), {
      email: "email",
      password: "password",
    });
  });

  it("should be able to batch failure results", () => {
    const results = Result.all({
      email: Result.failure("email"),
      password: Result.failure("password"),
    });

    assert.equal(results.isSuccess, false);
    assert.equal(results.isFailure, true);

    const errors = results.exceptionOrNull();

    assert.equal(errors?.email, "email");
    assert.equal(errors?.password, "password");
  });
});
