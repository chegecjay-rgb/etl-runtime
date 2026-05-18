import {
  CONSISTENCY_STATES,
  assertConsistencyState,
  isConsistencyState
} from "../../graph/states";

import {
  deepFreeze
} from "../../graph/immutable";

describe("TASK-008 consistency states", () => {
  test("validates consistency states correctly", () => {
    expect(CONSISTENCY_STATES.length).toBe(4);

    expect(
      isConsistencyState("VALID")
    ).toBe(true);

    expect(
      isConsistencyState("BROKEN")
    ).toBe(false);

    expect(
      assertConsistencyState("UNKNOWN")
    ).toBe("UNKNOWN");
  });

  test("deepFreeze freezes nested objects", () => {
    const frozen = deepFreeze({
      nested: {
        value: 1
      }
    });

    expect(
      Object.isFrozen(frozen)
    ).toBe(true);

    expect(
      Object.isFrozen(frozen.nested)
    ).toBe(true);
  });
});
