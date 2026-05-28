const assert = require("assert");

function detectDuplicateLineage(identities) {
  const observed = new Map();

  for (const identity of identities) {
    const existing = observed.get(identity.lineageId);

    if (
      existing !== undefined &&
      existing !== identity.manifestHash
    ) {
      return {
        status: "REJECTED",
        reason: "DUPLICATE_LINEAGE_CONFLICT",
        lineageId: identity.lineageId
      };
    }

    observed.set(identity.lineageId, identity.manifestHash);
  }

  return null;
}

const result = detectDuplicateLineage([
  {
    lineageId: "alpha",
    manifestHash: "hash-a"
  },
  {
    lineageId: "alpha",
    manifestHash: "hash-b"
  }
]);

assert.deepStrictEqual(
  result,
  {
    status: "REJECTED",
    reason: "DUPLICATE_LINEAGE_CONFLICT",
    lineageId: "alpha"
  }
);

console.log("replay isolation deterministic test passed");
