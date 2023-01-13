import { assert, describe, it } from "vitest";
import { Id } from "./id.js";

describe("id", () => {
  it("should be always different", () => {
    const id1 = Id.generate();
    const id2 = Id.generate();

    assert.notEqual(id1.valueOf(), id2.valueOf());
  });
});
