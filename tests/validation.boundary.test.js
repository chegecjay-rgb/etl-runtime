const assert = require("node:assert/strict");

const {
  validateEvidence
} = require("../dist/verifier/canonical/validate");

const validEvidence = {
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
    beta: [
      true,
      "stable"
    ]
  }
};

const validResult =
  validateEvidence(
    validEvidence
  );

assert.equal(
  validResult.valid,
  true
);

const invalidEvidence = {
  schemaVersion: "1.0.0",
  kind: "DISCLOSURE",
  identifier: {
    namespace:
      "etl.reference.verifier",
    evidenceHash:
      "abc123"
  },
  payload: {
    invalid: undefined
  }
};

const invalidResult =
  validateEvidence(
    invalidEvidence
  );

assert.equal(
  invalidResult.valid,
  false
);

assert.ok(
  invalidResult.violations
    .length > 0
);

console.log(
  "validation.boundary.test.js passed"
);
