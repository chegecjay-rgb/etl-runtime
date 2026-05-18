export type CanonicalGraphNode = Readonly<{
  id: string;
  parents: readonly string[];
  authority: string;
}>;

export type CanonicalGraphEdge = Readonly<{
  from: string;
  to: string;
  ordinal: number;
}>;

export type CanonicalAdjacencyMap =
  ReadonlyMap<string, readonly string[]>;

export type CanonicalGraph = Readonly<{
  nodes: readonly CanonicalGraphNode[];
  edges: readonly CanonicalGraphEdge[];
}>;

export type CanonicalProjectionRecord = Readonly<{
  nodeId: string;
  executionId: string;
  parentExecutionId: string | null;
  ordinal: number;
  authority?: string;
  timestamp?: string;
}>;

export type CanonicalValidationState =
  | "VALID"
  | "INVALID";

export type CanonicalValidationResult = Readonly<{
  state: CanonicalValidationState;
}>;

export type CanonicalCycle = Readonly<{
  path: readonly string[];
}>;
