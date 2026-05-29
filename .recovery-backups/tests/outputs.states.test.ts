import {
  VERIFICATION_STATES,
  VERIFICATION_STATE_VALUES,
  isVerificationState
} from "../outputs/states.js";

describe("outputs/states", () => {
  test("exports immutable canonical verification states", () => {
    expect(Object.isFrozen(VERIFICATION_STATES)).toBe(true);
    expect(VERIFICATION_STATES.VALID).toBe("VALID");
    expect(VERIFICATION_STATES.INVALID).toBe("INVALID");
    expect(VERIFICATION_STATES.UNDECLARED).toBe("UNDECLARED");
    expect(VERIFICATION_STATES.INCONSISTENT).toBe("INCONSISTENT");
    expect(VERIFICATION_STATES.UNKNOWN).toBe("UNKNOWN");
  });

  test("exports immutable verification state values", () => {
    expect(Object.isFrozen(VERIFICATION_STATE_VALUES)).toBe(true);

    expect(VERIFICATION_STATE_VALUES).toEqual([
      "VALID",
      "INVALID",
      "UNDECLARED",
      "INCONSISTENT",
      "UNKNOWN"
    ]);
  });

  test("accepts only constitutional verification states", () => {
    expect(isVerificationState("VALID")).toBe(true);
    expect(isVerificationState("INVALID")).toBe(true);
    expect(isVerificationState("UNDECLARED")).toBe(true);
    expect(isVerificationState("INCONSISTENT")).toBe(true);
    expect(isVerificationState("UNKNOWN")).toBe(true);

    expect(isVerificationState("PARTIAL")).toBe(false);
    expect(isVerificationState("LIKELY_VALID")).toBe(false);
    expect(isVerificationState("WARNING")).toBe(false);
    expect(isVerificationState("")).toBe(false);
    expect(isVerificationState(null)).toBe(false);
    expect(isVerificationState(undefined)).toBe(false);
    expect(isVerificationState({})).toBe(false);
  });

  test("rejects mutation attempts", () => {
    expect(() => {
      (VERIFICATION_STATES as Record<string, string>).VALID = "BROKEN";
    }).toThrow();
  });
});
