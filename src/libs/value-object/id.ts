import { randomUUID } from "node:crypto";
import { ValueObject } from "./value-object.js";
import { Result } from "../result/result.js";

export class Id extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static fromString(value: string): Result<Id, Error> {
    return Result.success(new Id(value));
  }

  public static generate(): Result<Id, Error> {
    return Result.success(new Id(randomUUID()));
  }
}
