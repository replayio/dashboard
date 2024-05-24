import { compress, decompress } from "@/utils/compression";
import { expect } from "@playwright/test";

describe("compression utils", () => {
  it("should compress empty values", () => {
    expect(compress("")).toBe("");
  });

  it("should decompress empty values", () => {
    expect(decompress("")).toBe(null);
  });

  it("should compress and decompress objects", () => {
    const object = { foo: "abc", bar: 123 };
    expect(decompress(compress(object))).toEqual(object);
  });

  it("should compress and decompress objects with undefined attributes", () => {
    const object = { foo: null, bar: undefined };
    expect(decompress(compress(object))).toEqual(object);
  });

  it("should compress and decompress arrays", () => {
    const array = ["foo", 123, true];
    expect(decompress(compress(array))).toEqual(array);
  });

  it("should not compress primitive values", () => {
    expect(decompress(compress("foo"))).toEqual("foo");
    expect(decompress(compress(123))).toEqual(123);
    expect(decompress(compress(true))).toEqual(true);
  });
});
