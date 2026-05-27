import {
  runVerificationOutputRuntime
} from "../verifier/outputs/runtime";

describe("verifier/outputs/runtime", () => {
  test("produces deterministic runtime outputs", () => {
    const first =
      runVerificationOutputRuntime(
        "VALID"
      );

    const second =
      runVerificationOutputRuntime(
        "VALID"
      );

    expect(first).toEqual(second);
  });

  test("preserves canonical machine state", () => {
    const output =
      runVerificationOutputRuntime(
        "INVALID"
      );

    expect(output.state).toBe(
      "INVALID"
    );
  });

  test("produces immutable runtime outputs", () => {
    const output =
      runVerificationOutputRuntime(
        "VALID"
      );

    expect(
      Object.isFrozen(output)
    ).toBe(true);

    expect(
      Object.isFrozen(output.formatted)
    ).toBe(true);

    expect(
      Object.isFrozen(output.certification)
    ).toBe(true);

    expect(
      Object.isFrozen(output.diagnostics)
    ).toBe(true);
  });

  test("preserves replay-safe certification", () => {
    const first =
      runVerificationOutputRuntime(
        "UNKNOWN"
      );

    const second =
      runVerificationOutputRuntime(
        "UNKNOWN"
      );

    expect(
      first.certification.hash
    ).toBe(
      second.certification.hash
    );
  });

  test("does not alter verification semantics", () => {
    const output =
      runVerificationOutputRuntime(
        "UNDECLARED"
      );

    expect(output.state).toBe(
      "UNDECLARED"
    );
  });

  test("preserves deterministic diagnostics", () => {
    const first =
      runVerificationOutputRuntime(
        "INCONSISTENT"
      );

    const second =
      runVerificationOutputRuntime(
        "INCONSISTENT"
      );

    expect(
      first.diagnostics
    ).toEqual(
      second.diagnostics
    );
  });
});
