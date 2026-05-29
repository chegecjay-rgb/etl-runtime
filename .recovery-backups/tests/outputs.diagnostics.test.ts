import {
  certifyOutput
} from "../outputs/certify.js";

import {
  inspectCertification,
  verifyImmutableBoundary,
  verifySerializationIntegrity
} from "../outputs/diagnostics.js";

describe("outputs/diagnostics", () => {
  test("provides read-only diagnostics", () => {
    const certification = certifyOutput({
      state: "VALID"
    });

    const diagnostics = inspectCertification(
      certification
    );

    expect(
      Object.isFrozen(diagnostics)
    ).toBe(true);
  });

  test("does not mutate certification outputs", () => {
    const certification = certifyOutput({
      state: "VALID"
    });

    const originalHash = certification.hash;

    inspectCertification(certification);

    expect(certification.hash).toBe(
      originalHash
    );
  });

  test("verifies immutable boundaries", () => {
    const certification = certifyOutput({
      state: "VALID"
    });

    expect(
      verifyImmutableBoundary(
        certification
      )
    ).toBe(true);
  });

  test("verifies serialization integrity", () => {
    const certification = certifyOutput({
      state: "INVALID"
    });

    expect(
      verifySerializationIntegrity(
        certification
      )
    ).toBe(true);
  });

  test("exposes certification visibility", () => {
    const certification = certifyOutput({
      state: "UNKNOWN"
    });

    const diagnostics = inspectCertification(
      certification
    );

    expect(
      diagnostics.hashLength
    ).toBe(64);

    expect(
      diagnostics.serializedLength
    ).toBeGreaterThan(0);
  });

  test("preserves replay-safe diagnostics", () => {
    const certification = certifyOutput({
      state: "UNDECLARED"
    });

    const first = inspectCertification(
      certification
    );

    const second = inspectCertification(
      certification
    );

    expect(first).toEqual(second);
  });
});
