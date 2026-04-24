import { describe, it, expect } from "@jest/globals";
import { getValueFromArrayOrString } from "@/utils/getValueFromArrayOrString";

describe("getValueFromArrayOrString", () => {
  it("should return the string when given a string", () => {
    expect(getValueFromArrayOrString("hello")).toBe("hello");
  });

  it("should return the first element when given an array", () => {
    expect(getValueFromArrayOrString(["first", "second"])).toBe("first");
  });

  it("should return undefined when given undefined", () => {
    expect(getValueFromArrayOrString(undefined)).toBeUndefined();
  });
});
