import { describe, it, expect } from "@jest/globals";
import {
  stringFromCustomAttribute,
  hasNonEmptyString,
  normalizeUserType,
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

describe("normalizeUserType", () => {
  it("should normalize 'engineer' variants", () => {
    expect(normalizeUserType("engineer")).toBe("engineer");
    expect(normalizeUserType("software_engineer")).toBe("engineer");
    expect(normalizeUserType("Software engineer")).toBe("engineer");
    expect(normalizeUserType("sw_engineer")).toBe("engineer");
  });

  it("should normalize 'vibe_coder' variants", () => {
    expect(normalizeUserType("vibe_coder")).toBe("vibe_coder");
    expect(normalizeUserType("vibecoder")).toBe("vibe_coder");
  });

  it("should pass through unknown types", () => {
    expect(normalizeUserType("designer")).toBe("designer");
  });

  it("should return empty for null/undefined", () => {
    expect(normalizeUserType(null)).toBe("");
    expect(normalizeUserType(undefined)).toBe("");
  });
});

describe("isIntakeComplete", () => {
  it("should return false for undefined attrs", () => {
    expect(isIntakeComplete(undefined)).toBe(false);
  });

  it("should return true for vibe_coder with a vibe_tool", () => {
    expect(isIntakeComplete({ user_type: "vibe_coder", vibe_tool: "Cursor" })).toBe(true);
  });

  it("should return false for vibe_coder without a vibe_tool", () => {
    expect(isIntakeComplete({ user_type: "vibe_coder" })).toBe(false);
  });

  it("should return true for engineer with a company name", () => {
    expect(isIntakeComplete({ user_type: "engineer", Company_name: "Acme" })).toBe(true);
  });

  it("should return false for engineer without a company name", () => {
    expect(isIntakeComplete({ user_type: "engineer" })).toBe(false);
  });

  it("should return false for unknown user types", () => {
    expect(isIntakeComplete({ user_type: "designer" })).toBe(false);
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
      custom_attributes: { user_type: "engineer" },
      updated_at: 2000,
    };
    const complete: IntercomContactForIntakePick = {
      custom_attributes: { user_type: "engineer", Company_name: "Acme" },
      updated_at: 1000,
    };
    expect(pickBestIntercomContactForIntake([incomplete, complete])).toBe(complete);
  });

  it("should prefer the most recently updated among complete contacts", () => {
    const older: IntercomContactForIntakePick = {
      custom_attributes: { user_type: "vibe_coder", vibe_tool: "Cursor" },
      updated_at: 1000,
    };
    const newer: IntercomContactForIntakePick = {
      custom_attributes: { user_type: "vibe_coder", vibe_tool: "Bolt" },
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
      custom_attributes: { source: "dashboard-intake", user_type: "engineer" },
      updated_at: 1000,
    };
    expect(pickBestIntercomContactForIntake([lowSignal, highSignal])).toBe(highSignal);
  });
});
