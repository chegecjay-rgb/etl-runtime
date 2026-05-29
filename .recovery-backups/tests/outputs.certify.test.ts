import {
  certifyOutput,
  certificationsEquivalent
} from "../outputs/certify.js";

describe("outputs/certify", () => {
  test("produces deterministic hashes", () => {
    const first = certifyOutput({
      state: "VALID",
      proof: {
        alpha: 1,
        beta: 2
      }
    });

    const second = certifyOutput({
      proof: {
        beta: 2,
        alpha: 1
      },
      state: "VALID"
    });

    expect(first.hash).toBe(second.hash);
  });

  test("produces deterministic serialized outputs", () => {
    const first = certifyOutput({
      zeta: 1,
      alpha: 2
    });

    const second = certifyOutput({
      alpha: 2,
      zeta: 1
    });

    expect(first.serialized).toBe(
      second.serialized
    );
  });

  test("freezes certification outputs", () => {
    const certification = certifyOutput({
      state: "VALID"
    });

    expect(
      Object.isFrozen(certification)
    ).toBe(true);
  });

  test("detects equivalent certifications", () => {
    const first = certifyOutput({
      state: "VALID"
    });

    const second = certifyOutput({
      state: "VALID"
    });

    expect(
      certificationsEquivalent(
        first,
        second
      )
    ).toBe(true);
  });

  test("detects divergent certifications", () => {
    const first = certifyOutput({
      state: "VALID"
    });

    const second = certifyOutput({
      state: "INVALID"
    });

    expect(
      certificationsEquivalent(
        first,
        second
      )
    ).toBe(false);
  });

  test("preserves replay-safe hash equivalence", () => {
    const input = {
      state: "UNDECLARED",
      nested: {
        gamma: true,
        alpha: true
      }
    };

    const first = certifyOutput(input);
    const second = certifyOutput(input);

    expect(first.hash).toBe(
      second.hash
    );
  });
});
