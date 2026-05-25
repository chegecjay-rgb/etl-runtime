const test = require("node:test");
const assert = require("node:assert/strict");

const { immutable } = require("../../dist/task010/ledger/immutable");

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
