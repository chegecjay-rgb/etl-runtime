const assert = require("node:assert/strict");

const {
  deepFreeze
} = require("../dist/verifier/canonical/freeze");

const canonicalEvidence =
  deepFreeze({
    schemaVersion: "1.0.0",
    kind: "DISCLOSURE",
    identifier: {
      namespace:
        "etl.reference.verifier",
      evidenceHash:
        "abc123"
    },
    payload: {
      alpha: 1,
      nested: {
        beta: true
      }
    }
  });

assert.equal(
  Object.isFrozen(
    canonicalEvidence
  ),
  true
);

assert.equal(
  Object.isFrozen(
    canonicalEvidence.identifier
  ),
  true
);

assert.equal(
  Object.isFrozen(
    canonicalEvidence.payload
  ),
  true
);

assert.equal(
  Object.isFrozen(
    canonicalEvidence.payload.nested
  ),
  true
);

try {
  canonicalEvidence.payload
    .nested.beta = false;
} catch {}

try {
  canonicalEvidence.payload
    .alpha = 999;
} catch {}

assert.equal(
  canonicalEvidence.payload
    .nested.beta,
  true
);

assert.equal(
  canonicalEvidence.payload
    .alpha,
  1
);

console.log(
  "mutation.resistance.test.js passed"
);
