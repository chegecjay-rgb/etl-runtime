export type DeterministicOrdering = -1 | 0 | 1;

export interface DeterministicComparator<T> {
  readonly name: string;

  compare(
    left: Readonly<T>,
    right: Readonly<T>
  ): DeterministicOrdering;
}

export interface CanonicalComparable {
  readonly id: string;
}

export interface TraversalNode {
  readonly id: string;
  readonly children?: readonly TraversalNode[];
}
