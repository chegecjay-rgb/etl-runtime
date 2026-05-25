const test = require("node:test");
const assert = require("node:assert/strict");

const {
  createCertificationEntry
} = require("../../dist/task010/ledger/entries");

test("entry generation is deterministic", () => {
  const payload = {
    authority: "constitutional-runtime",
    evidence: ["a", "b"]
  };

  const first = createCertificationEntry({
    artifactId: "artifact-001",
    artifactType: "verification",
    payload,
    lineageHash: null
  });

  const second = createCertificationEntry({
    artifactId: "artifact-001",
    artifactType: "verification",
    payload,
    lineageHash: null
  });

  assert.deepEqual(first, second);
});

test("entries are immutable", () => {
  const entry = createCertificationEntry({
    artifactId: "artifact-002",
    artifactType: "verification",
    payload: {
      replay: true
    },
    lineageHash: null
  });

  assert.equal(Object.isFrozen(entry), true);
  assert.equal(Object.isFrozen(entry.artifact), true);
  assert.equal(Object.isFrozen(entry.artifact.payload), true);
});
