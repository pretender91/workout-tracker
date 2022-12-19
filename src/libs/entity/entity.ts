import type { Equatable } from "../equatable.js";
import type { ValueObject } from "../value-object/value-object.js";

export class Entity implements Equatable {
  constructor(public readonly id: ValueObject<string>) {}

  public equals(other: this): boolean {
    return this.id.equals(other.id);
  }
}
