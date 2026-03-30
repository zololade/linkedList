import { fibs, fibsRec } from "../src/fibonacci";
import { describe, expect, it } from "vitest";

describe("fibonacci sequence", () => {
  it("expects fibonacci of 7 to be [ 1, 1, 2, 3, 5, 8, 13] ", () => {
    expect(fibsRec(7).sort()).toEqual([0, 1, 1, 2, 3, 5, 8, 13].sort());
  });
});
