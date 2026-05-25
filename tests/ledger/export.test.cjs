const test = require("node:test");
const assert = require("node:assert/strict");

const {
  createCertificationEntry
} = require("../../dist/task010/ledger/entries");

const {
  createLineage
} = require("../../dist/task010/ledger/lineage");

const {
  createReplayCheckpoint
} = require("../../dist/task010/ledger/history");

const {
  exportLedger,
  exportEquals
} = require("../../dist/task010/ledger/export");

test("ledger export generation is deterministic", () => {
  const entry = createCertificationEntry({
    artifactId: "artifact-export",
    artifactType: "verification",
    payload: {
      export: true
    },
    lineageHash: null
  });

  const lineage = createLineage([
    entry
  ]);

  const checkpoint = createReplayCheckpoint(
    lineage
  );

  const first = exportLedger(
    lineage,
    [checkpoint]
  );

  const second = exportLedger(
    lineage,
    [checkpoint]
  );

  assert.deepEqual(first, second);
});

test("export equivalence is replay stable", () => {
  const entry = createCertificationEntry({
    artifactId: "artifact-export",
    artifactType: "verification",
    payload: {
      export: true
    },
    lineageHash: null
  });

  const lineage = createLineage([
    entry
  ]);

  const checkpoint = createReplayCheckpoint(
    lineage
  );

  const left = exportLedger(
    lineage,
    [checkpoint]
  );

  const right = exportLedger(
    lineage,
    [checkpoint]
  );

  assert.equal(
    exportEquals(left, right),
    true
  );
});

test("exports are immutable", () => {
  const entry = createCertificationEntry({
    artifactId: "artifact-export",
    artifactType: "verification",
    payload: {
      immutable: true
    },
    lineageHash: null
  });

  const lineage = createLineage([
    entry
  ]);

  const checkpoint = createReplayCheckpoint(
    lineage
  );

  const exported = exportLedger(
    lineage,
    [checkpoint]
  );

  assert.equal(
    Object.isFrozen(exported),
    true
  );
});
