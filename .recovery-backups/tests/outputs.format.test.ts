import {
  stableSerialize,
  formatVerificationOutput
} from "../outputs/format.js";

describe("outputs/format", () => {
  test("produces deterministic serialization ordering", () => {
    const first = stableSerialize({
      zeta: 1,
      alpha: 2,
      beta: 3
    });

    const second = stableSerialize({
      beta: 3,
      zeta: 1,
      alpha: 2
    });

    expect(first).toBe(second);
  });

  test("preserves recursive canonical ordering", () => {
    const first = stableSerialize({
      outer: {
        z: true,
        a: true
      }
    });

    const second = stableSerialize({
      outer: {
        a: true,
        z: true
      }
    });

    expect(first).toBe(second);
  });

  test("removes undefined instability", () => {
    const serialized = stableSerialize({
      alpha: 1,
      beta: undefined
    });

    expect(serialized).toBe(
      "{\"alpha\":1}"
    );
  });

  test("formats deterministic verification outputs", () => {
    const first = formatVerificationOutput(
      "VALID"
    );

    const second = formatVerificationOutput(
      "VALID"
    );

    expect(first).toEqual(second);
  });

  test("produces replay-safe serialized outputs", () => {
    const output = formatVerificationOutput(
      "INVALID"
    );

    expect(output.serialized).toBe(
      "{\"state\":\"INVALID\"}"
    );
  });

  test("freezes formatted outputs", () => {
    const output = formatVerificationOutput(
      "VALID"
    );

    expect(
      Object.isFrozen(output)
    ).toBe(true);
  });
});
