const test = require("node:test");
const assert = require("node:assert/strict");

const {
  createCertificationEntry
} = require("../../dist/task010/ledger/entries");

const {
  createLineage
} = require("../../dist/task010/ledger/lineage");

const {
  createReplayCheckpoint,
  validateReplayEquivalence,
  certifyReplayHistory
} = require("../../dist/task010/ledger/history");

test("replay checkpoint generation is deterministic", () => {
  const entry = createCertificationEntry({
    artifactId: "artifact-history",
    artifactType: "verification",
    payload: {
      replay: true
    },
    lineageHash: null
  });

  const lineage = createLineage([
    entry
  ]);

  const first = createReplayCheckpoint(lineage);
  const second = createReplayCheckpoint(lineage);

  assert.deepEqual(first, second);
});

test("replay equivalence validation is stable", () => {
  const entry = createCertificationEntry({
    artifactId: "artifact-history",
    artifactType: "verification",
    payload: {
      replay: true
    },
    lineageHash: null
  });

  const lineage = createLineage([
    entry
  ]);

  const left = createReplayCheckpoint(lineage);
  const right = createReplayCheckpoint(lineage);

  assert.equal(
    validateReplayEquivalence(left, right),
    true
  );
});

test("historical replay certification is deterministic", () => {
  const entry = createCertificationEntry({
    artifactId: "artifact-history",
    artifactType: "verification",
    payload: {
      replay: true
    },
    lineageHash: null
  });

  const lineage = createLineage([
    entry
  ]);

  const checkpoint = createReplayCheckpoint(lineage);

  const first = certifyReplayHistory([
    checkpoint
  ]);

  const second = certifyReplayHistory([
    checkpoint
  ]);

  assert.equal(first, second);
});
