import assert from "node:assert/strict";

import {
  deriveCanonicalIdentifier
} from "../verifier/identifiers/derive";

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

Object.freeze(identifierA);

console.log(
  "identifier.stability.test.ts passed"
);
