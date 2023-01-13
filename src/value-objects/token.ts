import { createHmac, randomUUID } from "node:crypto";
import { ValueObject } from "../libs/value-object/value-object.js";

export class Token extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static fromString(value: string): Token {
    return new Token(value);
  }

  public static generate(salt: string = "Keklol1@"): Token {
    const hmac = createHmac("sha256", salt);
    hmac.update(randomUUID());
    return new Token(hmac.digest("hex"));
  }
}
