import type { Id } from "../../value-objects/id.js";
import type { Equatable } from "../equatable.js";

export class Entity implements Equatable {
  constructor(public readonly id: Id) {}

  public equals(other: this): boolean {
    return this.id.equals(other.id);
  }
}
