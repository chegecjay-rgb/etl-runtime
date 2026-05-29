const assert = require("assert");

function inspectCertificationArtifact(artifact) {
  if (
    artifact.certificationHash !== artifact.canonicalHash
  ) {
    return {
      status: "REJECTED",
      reason: "CERTIFICATION_HASH_MISMATCH"
    };
  }

  if (
    artifact.payload === null ||
    typeof artifact.payload !== "object" ||
    Array.isArray(artifact.payload)
  ) {
    return {
      status: "REJECTED",
      reason: "CERTIFICATION_CONTAMINATION"
    };
  }

  return null;
}

const mismatch = inspectCertificationArtifact({
  certificationHash: "alpha",
  canonicalHash: "beta",
  payload: {}
});

assert.deepStrictEqual(
  mismatch,
  {
    status: "REJECTED",
    reason: "CERTIFICATION_HASH_MISMATCH"
  }
);

const contamination = inspectCertificationArtifact({
  certificationHash: "alpha",
  canonicalHash: "alpha",
  payload: null
});

assert.deepStrictEqual(
  contamination,
  {
    status: "REJECTED",
    reason: "CERTIFICATION_CONTAMINATION"
  }
);

console.log("certification containment deterministic test passed");
