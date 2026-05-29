import {
  canonicalizeEvidence,
  CanonicalEvidence
} from "../../verifier/ordering/order.js";

function assert(
  condition: boolean,
  message: string
): void {
  if (!condition) {
    throw new Error(message);
  }
}

const evidence: readonly CanonicalEvidence[] = [
  {
    id: "e-003",
    timestamp: 200,
    authority: "authority-b",
    type: "event",
    hash: "hash-c"
  },
  {
    id: "e-001",
    timestamp: 100,
    authority: "authority-a",
    type: "event",
    hash: "hash-a"
  },
  {
    id: "e-002",
    timestamp: 100,
    authority: "authority-a",
    type: "event",
    hash: "hash-b"
  }
];

const snapshot = JSON.stringify(evidence);

const orderedA =
  canonicalizeEvidence(evidence);

const orderedB =
  canonicalizeEvidence(evidence);

assert(
  JSON.stringify(orderedA) ===
    JSON.stringify(orderedB),
  "Deterministic ordering failed"
);

assert(
  orderedA[0].id === "e-001",
  "Canonical ordering index 0 failed"
);

assert(
  orderedA[1].id === "e-002",
  "Canonical ordering index 1 failed"
);

assert(
  orderedA[2].id === "e-003",
  "Canonical ordering index 2 failed"
);

const shuffled: readonly CanonicalEvidence[] = [
  evidence[2],
  evidence[0],
  evidence[1]
];

const shuffledOrdered =
  canonicalizeEvidence(shuffled);

assert(
  JSON.stringify(orderedA) ===
    JSON.stringify(shuffledOrdered),
  "Shuffle equivalence failed"
);

assert(
  JSON.stringify(evidence) === snapshot,
  "Evidence mutation detected"
);

console.log(
  "Replay ordering certification passed"
);
