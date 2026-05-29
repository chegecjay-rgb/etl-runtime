import {
  DeterministicOrdering
} from "../../types/ordering.js";

export function normalizeLexical(
  value: string
): string {
  return value.normalize("NFKC");
}

export function lexicalTieBreak(
  left: string,
  right: string
): DeterministicOrdering {
  const normalizedLeft =
    normalizeLexical(left);

  const normalizedRight =
    normalizeLexical(right);

  if (normalizedLeft < normalizedRight) {
    return -1;
  }

  if (normalizedLeft > normalizedRight) {
    return 1;
  }

  return 0;
}

export function deterministicTieBreak(
  primary: DeterministicOrdering,
  leftId: string,
  rightId: string
): DeterministicOrdering {
  if (
    primary !== -1 &&
    primary !== 0 &&
    primary !== 1
  ) {
    throw new Error(
      "Invalid deterministic ordering"
    );
  }

  if (primary !== 0) {
    return primary;
  }

  return lexicalTieBreak(
    leftId,
    rightId
  );
}
