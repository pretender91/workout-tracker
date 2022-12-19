import type { Equatable } from "../equatable.js";
import { Comparable, CompareResult } from "../comparable.js";

export class ValueObject<T> implements Equatable, Comparable {
  constructor(private readonly value: T) {}

  public valueOf(): T {
    return this.value;
  }

  public equals(other: this): boolean {
    return this.value === other.value;
  }

  public compare(other: this): CompareResult {
    if (this.value < other.value) {
      return CompareResult.Lower;
    }

    if (this.value === other.value) {
      return CompareResult.Equal;
    }

    return CompareResult.Greater;
  }
}
