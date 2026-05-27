import {
  deepFreeze
} from "../outputs/immutable";

import {
  stableSerialize
} from "../outputs/format";

import {
  certifyOutput
} from "../outputs/certify";

describe("TASK-014 constitutional audit", () => {
  test("immutability proof", () => {
    const value = deepFreeze({
      state: "VALID",
      nested: {
        items: [1, 2, 3]
      }
    });

    expect(Object.isFrozen(value)).toBe(true);
    expect(Object.isFrozen(value.nested)).toBe(true);
    expect(Object.isFrozen(value.nested.items)).toBe(true);
  });

  test("mutation rejection proof", () => {
    "use strict";

    const value = deepFreeze({
      state: "VALID"
    });

    expect(() => {
      (value as any).state = "INVALID";
    }).toThrow();
  });

  test("serialization proof", () => {
    const a = {
      z: 1,
      a: {
        y: 2,
        x: 3
      }
    };

    const b = {
      a: {
        x: 3,
        y: 2
      },
      z: 1
    };

    expect(
      stableSerialize(a)
    ).toBe(
      stableSerialize(b)
    );
  });

  test("unicode normalization proof", () => {
    const composed = "é";
    const decomposed = "e\u0301";

    expect(
      stableSerialize(composed.normalize("NFC"))
    ).toBe(
      stableSerialize(decomposed.normalize("NFC"))
    );
  });

  test("deterministic certification proof", () => {
    const value = {
      state: "VALID",
      proof: {
        id: "abc"
      }
    };

    const a = certifyOutput(value);
    const b = certifyOutput(value);

    expect(a.hash).toBe(b.hash);
  });

  test("replay proof", () => {
    const value = {
      state: "VALID",
      nested: {
        value: 42
      }
    };

    const first = stableSerialize(value);
    const second = stableSerialize(value);

    expect(first).toBe(second);
  });

  test("prototype rejection proof", () => {
    class Dangerous {
      value = 1;
    }

    expect(() => {
      stableSerialize(new Dangerous());
    }).toThrow();
  });

  test("function rejection proof", () => {
    expect(() => {
      stableSerialize({
        fn: () => true
      });
    }).toThrow();
  });

  test("symbol rejection proof", () => {
    expect(() => {
      stableSerialize({
        value: Symbol("bad")
      });
    }).toThrow();
  });

  test("non-finite number rejection proof", () => {
    expect(() => {
      stableSerialize({
        value: NaN
      });
    }).toThrow();

    expect(() => {
      stableSerialize({
        value: Infinity
      });
    }).toThrow();

    expect(() => {
      stableSerialize({
        value: -Infinity
      });
    }).toThrow();
  });
});
