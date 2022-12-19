import { assert, describe, it } from "vitest";
import { Entity } from "./entity.js";
import { ValueObject } from "../value-object/value-object.js";

describe("Entity", () => {
  it("should be equal to another entity with the same id", () => {
    const entity1 = new Entity(new ValueObject("1"));
    const entity2 = new Entity(new ValueObject("2"));
    const entity3 = new Entity(new ValueObject("1"));

    assert.equal(entity1.equals(entity2), false);
    assert.equal(entity1.equals(entity3), true);
  });
});
