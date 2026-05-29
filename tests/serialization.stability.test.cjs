const assert = require("node:assert/strict");

const {
  serializeCanonical
} = require("../dist/verifier/canonical/serializer");

const unorderedEvidence = {
  zeta: 1,
  alpha: 2,
  nested: {
    omega: true,
    beta: false
  }
};

const serializationA =
  serializeCanonical(
    unorderedEvidence
  );

const serializationB =
  serializeCanonical(
    unorderedEvidence
  );

assert.equal(
  serializationA,
  serializationB
);

assert.equal(
  serializationA,
  '{"alpha":2,"nested":{"beta":false,"omega":true},"zeta":1}'
);

const reorderedEvidence = {
  nested: {
    beta: false,
    omega: true
  },
  alpha: 2,
  zeta: 1
};

const serializationC =
  serializeCanonical(
    reorderedEvidence
  );

assert.equal(
  serializationA,
  serializationC
);

console.log(
  "serialization.stability.test.js passed"
);
