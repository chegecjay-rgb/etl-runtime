import type { DeterministicOrdering } from "../../types/ordering.js";

export type Comparator<T> = (
  left: Readonly<T>,
  right: Readonly<T>
) => DeterministicOrdering;

export function compareStrings(
  left: string,
  right: string
): DeterministicOrdering {
  const normalizedLeft = normalizeLexical(left);
  const normalizedRight = normalizeLexical(right);

  if (normalizedLeft < normalizedRight) {
    return -1;
  }

  if (normalizedLeft > normalizedRight) {
    return 1;
  }

  return 0;
}

export function compareNumbers(
  left: number,
  right: number
): DeterministicOrdering {
  if (!Number.isFinite(left)) {
    throw new Error("Left comparison operand is non-finite");
  }

  if (!Number.isFinite(right)) {
    throw new Error("Right comparison operand is non-finite");
  }

  if (left < right) {
    return -1;
  }

  if (left > right) {
    return 1;
  }

  return 0;
}

export function normalizeLexical(
  value: string
): string {
  return value.normalize("NFKC");
}

export function chainComparators<T>(
  comparators: Array<Comparator<T>>
): Comparator<T> {
  return (
    left: Readonly<T>,
    right: Readonly<T>
  ): DeterministicOrdering => {
    for (const comparator of comparators) {
      const result = comparator(left, right);

      if (
        result !== -1 &&
        result !== 0 &&
        result !== 1
      ) {
        throw new Error(
          "Comparator produced invalid deterministic ordering"
        );
      }

      if (result !== 0) {
        return result;
      }
    }

    return 0;
  };
}
