import { describe, it, expect } from "@jest/globals";
import {
  stringFromCustomAttribute,
  hasNonEmptyString,
  isIntakeComplete,
  pickBestIntercomContactForIntake,
  IntercomContactForIntakePick,
} from "@/utils/intakeIntercomComplete";

describe("stringFromCustomAttribute", () => {
  it("should return trimmed string for string input", () => {
    expect(stringFromCustomAttribute("  hello  ")).toBe("hello");
  });

  it("should return empty string for null/undefined", () => {
    expect(stringFromCustomAttribute(null)).toBe("");
    expect(stringFromCustomAttribute(undefined)).toBe("");
  });

  it("should coerce numbers and booleans", () => {
    expect(stringFromCustomAttribute(42)).toBe("42");
    expect(stringFromCustomAttribute(true)).toBe("true");
  });

  it("should extract .value from objects", () => {
    expect(stringFromCustomAttribute({ value: " Cursor " })).toBe("Cursor");
  });

  it("should extract .name from objects", () => {
    expect(stringFromCustomAttribute({ name: "Acme Corp" })).toBe("Acme Corp");
  });

  it("should return empty string for unrecognized objects", () => {
    expect(stringFromCustomAttribute({ foo: "bar" })).toBe("");
  });
});

describe("hasNonEmptyString", () => {
  it("should return true for non-empty values", () => {
    expect(hasNonEmptyString("hello")).toBe(true);
  });

  it("should return false for empty/null values", () => {
    expect(hasNonEmptyString("")).toBe(false);
    expect(hasNonEmptyString(null)).toBe(false);
    expect(hasNonEmptyString("   ")).toBe(false);
  });
});

describe("isIntakeComplete", () => {
  it("should return false for undefined attrs", () => {
    expect(isIntakeComplete(undefined)).toBe(false);
  });

  it("should return true when Company_name is non-empty", () => {
    expect(isIntakeComplete({ Company_name: "Acme" })).toBe(true);
  });

  it("should accept the lowercase company_name spelling", () => {
    expect(isIntakeComplete({ company_name: "Acme" })).toBe(true);
  });

  it("should return false when company name is missing", () => {
    expect(isIntakeComplete({})).toBe(false);
  });

  it("should return false when company name is blank", () => {
    expect(isIntakeComplete({ Company_name: "   " })).toBe(false);
  });

  it("should ignore legacy attributes when company name is missing", () => {
    expect(isIntakeComplete({ user_type: "vibe_coder", vibe_tool: "Cursor" })).toBe(false);
  });
});

describe("pickBestIntercomContactForIntake", () => {
  it("should return null for empty array", () => {
    expect(pickBestIntercomContactForIntake([])).toBeNull();
  });

  it("should return the single contact", () => {
    const contact: IntercomContactForIntakePick = { custom_attributes: {} };
    expect(pickBestIntercomContactForIntake([contact])).toBe(contact);
  });

  it("should prefer a complete contact over an incomplete one", () => {
    const incomplete: IntercomContactForIntakePick = {
      custom_attributes: { source: "dashboard-intake" },
      updated_at: 2000,
    };
    const complete: IntercomContactForIntakePick = {
      custom_attributes: { Company_name: "Acme" },
      updated_at: 1000,
    };
    expect(pickBestIntercomContactForIntake([incomplete, complete])).toBe(complete);
  });

  it("should prefer the most recently updated among complete contacts", () => {
    const older: IntercomContactForIntakePick = {
      custom_attributes: { Company_name: "Acme" },
      updated_at: 1000,
    };
    const newer: IntercomContactForIntakePick = {
      custom_attributes: { Company_name: "Acme" },
      updated_at: 2000,
    };
    expect(pickBestIntercomContactForIntake([older, newer])).toBe(newer);
  });

  it("should prefer higher signal score when no contacts are complete", () => {
    const lowSignal: IntercomContactForIntakePick = {
      custom_attributes: {},
      updated_at: 2000,
    };
    const highSignal: IntercomContactForIntakePick = {
      custom_attributes: { source: "dashboard-intake" },
      updated_at: 1000,
    };
    expect(pickBestIntercomContactForIntake([lowSignal, highSignal])).toBe(highSignal);
  });
});
