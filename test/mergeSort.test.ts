import { mergeSort } from "../src/mergeSort";
import { describe, expect, it } from "vitest";

describe("merge sort", () => {
  it("expects mergeSort of [] to be [] ", () => {
    expect(mergeSort([])).toEqual([]);
  });

  it("expects mergeSort of [73] to be [73] ", () => {
    expect(mergeSort([73])).toEqual([73]);
  });

  it("expects mergeSort of [1,2,3,4,5] to be [1,2,3,4,5] ", () => {
    expect(mergeSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it("expects mergeSort of [3, 2, 1, 13, 8, 5, 0, 1] to be [0, 1, 1, 2, 3, 5, 8, 13] ", () => {
    expect(mergeSort([3, 2, 1, 13, 8, 5, 0, 1])).toEqual([
      0, 1, 1, 2, 3, 5, 8, 13,
    ]);
  });

  it("expects mergeSort of [1,2,3,4,5] to be [1,2,3,4,5] ", () => {
    expect(mergeSort([105, 79, 100, 110])).toEqual([79, 100, 105, 110]);
  });
});
