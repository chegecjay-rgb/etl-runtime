import {
  resolveVerificationState,
  getResolutionOrder
} from "../outputs/resolve";

describe("outputs/resolve", () => {
  test("preserves constitutional resolution order", () => {
    expect(getResolutionOrder()).toEqual([
      "INCONSISTENT",
      "INVALID",
      "UNDECLARED",
      "UNKNOWN",
      "VALID"
    ]);
  });

  test("resolves INCONSISTENT before all other states", () => {
    expect(
      resolveVerificationState({
        hasRuleViolations: true,
        hasUndeclaredAuthorities: true,
        hasReplayDivergence: true,
        hasUnknownEvidence: true
      })
    ).toBe("INCONSISTENT");
  });

  test("resolves INVALID deterministically", () => {
    expect(
      resolveVerificationState({
        hasRuleViolations: true,
        hasUndeclaredAuthorities: false,
        hasReplayDivergence: false,
        hasUnknownEvidence: false
      })
    ).toBe("INVALID");
  });

  test("resolves UNDECLARED deterministically", () => {
    expect(
      resolveVerificationState({
        hasRuleViolations: false,
        hasUndeclaredAuthorities: true,
        hasReplayDivergence: false,
        hasUnknownEvidence: false
      })
    ).toBe("UNDECLARED");
  });

  test("resolves UNKNOWN deterministically", () => {
    expect(
      resolveVerificationState({
        hasRuleViolations: false,
        hasUndeclaredAuthorities: false,
        hasReplayDivergence: false,
        hasUnknownEvidence: true
      })
    ).toBe("UNKNOWN");
  });

  test("resolves VALID deterministically", () => {
    expect(
      resolveVerificationState({
        hasRuleViolations: false,
        hasUndeclaredAuthorities: false,
        hasReplayDivergence: false,
        hasUnknownEvidence: false
      })
    ).toBe("VALID");
  });

  test("preserves replay-safe equivalence", () => {
    const input = {
      hasRuleViolations: true,
      hasUndeclaredAuthorities: false,
      hasReplayDivergence: false,
      hasUnknownEvidence: false
    };

    const first = resolveVerificationState(input);
    const second = resolveVerificationState(input);

    expect(first).toBe(second);
  });
});
