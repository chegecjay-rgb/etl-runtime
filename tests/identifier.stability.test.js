const assert = require("node:assert/strict");

const {
  deriveCanonicalIdentifier
} = require("../dist/verifier/identifiers/derive");

const canonicalPayload =
  '{"a":1,"b":2}';

const identifierA =
  deriveCanonicalIdentifier({
    schemaVersion: "1.0.0",
    kind: "DISCLOSURE",
    canonicalPayload
  });

const identifierB =
  deriveCanonicalIdentifier({
    schemaVersion: "1.0.0",
    kind: "DISCLOSURE",
    canonicalPayload
  });

assert.deepStrictEqual(
  identifierA,
  identifierB
);

assert.equal(
  identifierA.namespace,
  "etl.reference.verifier"
);

assert.equal(
  identifierA.evidenceHash.length,
  64
);

console.log(
  "identifier.stability.test.js passed"
);
