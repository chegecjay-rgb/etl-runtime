const test = require("node:test");
const assert = require("node:assert/strict");

const {
  createCertificationEntry
} = require("../../dist/task010/ledger/entries");

const {
  createLineage
} = require("../../dist/task010/ledger/lineage");

const {
  createSnapshot,
  snapshotEquals
} = require("../../dist/task010/ledger/snapshots");

test("snapshot generation is deterministic", () => {
  const entry = createCertificationEntry({
    artifactId: "artifact-snapshot",
    artifactType: "verification",
    payload: {
      checkpoint: true
    },
    lineageHash: null
  });

  const lineage = createLineage([
    entry
  ]);

  const first = createSnapshot(lineage);
  const second = createSnapshot(lineage);

  assert.deepEqual(first, second);
});

test("snapshot equivalence is replay stable", () => {
  const entry = createCertificationEntry({
    artifactId: "artifact-snapshot",
    artifactType: "verification",
    payload: {
      checkpoint: true
    },
    lineageHash: null
  });

  const lineage = createLineage([
    entry
  ]);

  const left = createSnapshot(lineage);
  const right = createSnapshot(lineage);

  assert.equal(
    snapshotEquals(left, right),
    true
  );
});

test("snapshots are immutable", () => {
  const entry = createCertificationEntry({
    artifactId: "artifact-snapshot",
    artifactType: "verification",
    payload: {
      immutable: true
    },
    lineageHash: null
  });

  const lineage = createLineage([
    entry
  ]);

  const snapshot = createSnapshot(lineage);

  assert.equal(
    Object.isFrozen(snapshot),
    true
  );
});
