const test = require("node:test");
const assert = require("node:assert/strict");

const {
  canonicalize,
  deterministicHash
} = require("../../dist/task010/ledger/hashes");

test("canonical serialization is stable", () => {
  const a = {
    z: 1,
    a: 2
  };

  const b = {
    a: 2,
    z: 1
  };

  assert.equal(
    canonicalize(a),
    canonicalize(b)
  );
});

test("deterministic hashing is replay stable", () => {
  const payload = {
    b: 2,
    a: 1
  };

  const first = deterministicHash(payload);
  const second = deterministicHash(payload);

  assert.equal(first, second);
});
