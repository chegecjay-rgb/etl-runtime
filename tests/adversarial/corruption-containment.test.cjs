const assert = require("assert");

function inspectCorruptedArtifact(inspection) {
  const payload = inspection.payload;

  if (
    payload === null ||
    typeof payload !== "object" ||
    Array.isArray(payload)
  ) {
    return {
      status: "REJECTED",
      reason: "INVALID_SERIALIZATION",
      artifactId: inspection.artifactId
    };
  }

  for (const [key, value] of Object.entries(payload)) {
    if (
      typeof key !== "string" ||
      value === undefined
    ) {
      return {
        status: "REJECTED",
        reason: "STRUCTURAL_CORRUPTION",
        artifactId: inspection.artifactId
      };
    }
  }

  return null;
}

const invalidSerialization = inspectCorruptedArtifact({
  artifactId: "artifact-a",
  payload: null
});

assert.deepStrictEqual(
  invalidSerialization,
  {
    status: "REJECTED",
    reason: "INVALID_SERIALIZATION",
    artifactId: "artifact-a"
  }
);

const structuralCorruption = inspectCorruptedArtifact({
  artifactId: "artifact-b",
  payload: {
    alpha: undefined
  }
});

assert.deepStrictEqual(
  structuralCorruption,
  {
    status: "REJECTED",
    reason: "STRUCTURAL_CORRUPTION",
    artifactId: "artifact-b"
  }
);

console.log("corruption containment deterministic test passed");
