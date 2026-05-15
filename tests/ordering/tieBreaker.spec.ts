import {
  normalizeLexical,
  lexicalTieBreak,
  deterministicTieBreak
} from "../../verifier/ordering/tieBreaker";

function assert(
  condition: boolean,
  message: string
): void {
  if (!condition) {
    throw new Error(message);
  }
}

assert(
  normalizeLexical("é") ===
    normalizeLexical("é"),
  "Unicode normalization failed"
);

assert(
  lexicalTieBreak(
    "alpha",
    "beta"
  ) === -1,
  "Lexical ordering failed"
);

assert(
  lexicalTieBreak(
    "beta",
    "alpha"
  ) === 1,
  "Reverse lexical ordering failed"
);

assert(
  deterministicTieBreak(
    0,
    "e-001",
    "e-002"
  ) === -1,
  "Deterministic tie-break failed"
);

assert(
  deterministicTieBreak(
    -1,
    "e-002",
    "e-001"
  ) === -1,
  "Primary comparator preservation failed"
);

console.log(
  "Stable tie-breaking certification passed"
);
