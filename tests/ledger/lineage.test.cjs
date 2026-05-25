const test = require("node:test");
const assert = require("node:assert/strict");

const {
  createCertificationEntry
} = require("../../dist/task010/ledger/entries");

const {
  createLineage,
  appendEntry
} = require("../../dist/task010/ledger/lineage");

test("lineage generation is deterministic", () => {
  const entryA = createCertificationEntry({
    artifactId: "artifact-a",
    artifactType: "verification",
    payload: {
      value: "A"
    },
    lineageHash: null
  });

  const entryB = createCertificationEntry({
    artifactId: "artifact-b",
    artifactType: "verification",
    payload: {
      value: "B"
    },
    lineageHash: null
  });

  const first = createLineage([
    entryA,
    entryB
  ]);

  const second = createLineage([
    entryB,
    entryA
  ]);

  assert.deepEqual(first, second);
});

test("lineage append preserves continuity", () => {
  const entryA = createCertificationEntry({
    artifactId: "artifact-a",
    artifactType: "verification",
    payload: {
      value: "A"
    },
    lineageHash: null
  });

  const entryB = createCertificationEntry({
    artifactId: "artifact-b",
    artifactType: "verification",
    payload: {
      value: "B"
    },
    lineageHash: null
  });

  const lineage = createLineage([
    entryA
  ]);

  const appended = appendEntry(
    lineage,
    entryB
  );

  assert.equal(
    appended.entries.length,
    2
  );

  assert.equal(
    Object.isFrozen(appended),
    true
  );
});
