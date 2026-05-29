import test from "node:test";
import assert from "node:assert/strict";

import {
  canonicalize,
  deterministicHash
} from "../../ledger/hashes.js";

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
