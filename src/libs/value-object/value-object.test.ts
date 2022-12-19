import { assert, describe, it } from "vitest";
import { ValueObject } from "./value-object.js";

describe("ValueObject", () => {
  it("should be equal to another value object with the same value", () => {
    const value = 123;
    const valueObject1 = new ValueObject(value);
    const valueObject2 = new ValueObject(value);
    const valueObject3 = new ValueObject(321);

    assert.equal(valueObject1.equals(valueObject2), true);
    assert.equal(valueObject2.equals(valueObject1), true);
    assert.equal(valueObject1.equals(valueObject3), false);
  });

  it("should be comparable", () => {
    const valueObject1 = new ValueObject(1);
    const valueObject2 = new ValueObject(2);
    const valueObject3 = new ValueObject(1);

    assert.equal(valueObject1.compare(valueObject2), -1);
    assert.equal(valueObject2.compare(valueObject1), 1);
    assert.equal(valueObject1.compare(valueObject3), 0);
  });
});
