import { randomUUID } from "node:crypto";
import { ValueObject } from "../libs/value-object/value-object.js";

export class Id extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static fromString(value: string): Id {
    return new Id(value);
  }

  public static generate(): Id {
    return new Id(randomUUID());
  }
}
