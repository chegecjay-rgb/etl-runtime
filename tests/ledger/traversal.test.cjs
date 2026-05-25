const test = require("node:test");
const assert = require("node:assert/strict");

const {
  createCertificationEntry
} = require("../../dist/task010/ledger/entries");

const {
  createLineage
} = require("../../dist/task010/ledger/lineage");

const {
  traverseLineage,
  traverseEntryIds,
  traverseCertificationHashes
} = require("../../dist/task010/ledger/traversal");

test("lineage traversal ordering is deterministic", () => {
  const entryB = createCertificationEntry({
    artifactId: "artifact-b",
    artifactType: "verification",
    payload: {
      value: "B"
    },
    lineageHash: null
  });

  const entryA = createCertificationEntry({
    artifactId: "artifact-a",
    artifactType: "verification",
    payload: {
      value: "A"
    },
    lineageHash: null
  });

  const lineage = createLineage([
    entryB,
    entryA
  ]);

  const traversal = traverseLineage(lineage);

  assert.equal(
    traversal[0].artifact.artifactId,
    "artifact-a"
  );

  assert.equal(
    traversal[1].artifact.artifactId,
    "artifact-b"
  );
});

test("entry identifier traversal is stable", () => {
  const entry = createCertificationEntry({
    artifactId: "artifact-id",
    artifactType: "verification",
    payload: {
      stable: true
    },
    lineageHash: null
  });

  const lineage = createLineage([
    entry
  ]);

  const first = traverseEntryIds(lineage);
  const second = traverseEntryIds(lineage);

  assert.deepEqual(first, second);
});

test("certification hash traversal is immutable", () => {
  const entry = createCertificationEntry({
    artifactId: "artifact-hash",
    artifactType: "verification",
    payload: {
      hash: true
    },
    lineageHash: null
  });

  const lineage = createLineage([
    entry
  ]);

  const traversal = traverseCertificationHashes(lineage);

  assert.equal(
    Object.isFrozen(traversal),
    true
  );
});
