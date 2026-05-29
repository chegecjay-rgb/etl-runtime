import {
  deepFreeze,
  createImmutableVerificationOutput
} from "../outputs/immutable.js";

describe("outputs/immutable", () => {
  test("deeply freezes nested objects", () => {
    const frozen = deepFreeze({
      alpha: {
        beta: {
          gamma: true
        }
      }
    });

    expect(Object.isFrozen(frozen)).toBe(true);
    expect(Object.isFrozen(frozen.alpha)).toBe(true);
    expect(Object.isFrozen(frozen.alpha.beta)).toBe(true);
  });

  test("deeply freezes arrays", () => {
    const frozen = deepFreeze({
      values: [
        {
          state: "VALID"
        }
      ]
    });

    expect(Object.isFrozen(frozen.values)).toBe(true);
    expect(Object.isFrozen(frozen.values[0])).toBe(true);
  });

  test("rejects mutation attempts", () => {
    const frozen = createImmutableVerificationOutput({
      state: "VALID",
      serialized: "{\"state\":\"VALID\"}",
      certificationHash: "abc123"
    });

    expect(() => {
      (
        frozen as {
          state: string;
        }
      ).state = "INVALID";
    }).toThrow();
  });

  test("preserves deterministic equivalence", () => {
    const first = createImmutableVerificationOutput({
      state: "VALID",
      serialized: "{\"state\":\"VALID\"}",
      certificationHash: "abc123"
    });

    const second = createImmutableVerificationOutput({
      state: "VALID",
      serialized: "{\"state\":\"VALID\"}",
      certificationHash: "abc123"
    });

    expect(first).toEqual(second);
  });
});
