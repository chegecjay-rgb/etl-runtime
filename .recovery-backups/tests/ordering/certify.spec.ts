import {
  assertDeterministicEquality,
  assertImmutableSnapshot,
  createReplaySnapshot,
  certifyReplayOrdering
} from "../../verifier/ordering/certify.js";

function assert(
  condition: boolean,
  message: string
): void {
  if (!condition) {
    throw new Error(message);
  }
}

const baseline = [
  {
    id: "e-001"
  },
  {
    id: "e-002"
  }
] as const;

const equivalent = [
  {
    id: "e-001"
  },
  {
    id: "e-002"
  }
] as const;

const snapshot =
  createReplaySnapshot(baseline);

assertDeterministicEquality(
  baseline,
  equivalent,
  "Replay equivalence failed"
);

assertImmutableSnapshot(
  baseline,
  snapshot,
  "Mutation resistance failed"
);

const certification =
  certifyReplayOrdering(
    baseline,
    equivalent
  );

assert(
  certification.deterministic,
  "Replay certification failed"
);

assert(
  certification.baselineHash ===
    certification.candidateHash,
  "Replay hash mismatch detected"
);

console.log(
  "Ordering certification utilities passed"
);
