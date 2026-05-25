import test from "node:test";
import assert from "node:assert/strict";

import { immutable } from "../../ledger/immutable";

test("deep freeze recursively freezes structures", () => {
  const frozen = immutable({
    nested: {
      values: ["a", "b", "c"]
    }
  });

  assert.equal(Object.isFrozen(frozen), true);
  assert.equal(Object.isFrozen(frozen.nested), true);
  assert.equal(Object.isFrozen(frozen.nested.values), true);
});
