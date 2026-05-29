export interface CanonicalReplayDAG {
  readonly roots: readonly string[];
  readonly adjacency: Readonly<Record<string, readonly string[]>>;
  readonly graphHash: string;
}

export function projectCanonicalDAG(
  value: unknown
): CanonicalReplayDAG {
  if (
    value !== null &&
    typeof value === "object"
  ) {
    const candidate = value as Record<string, unknown>

    return {
      roots: Array.isArray(candidate.roots)
        ? candidate.roots as readonly string[]
        : [],
      adjacency:
        candidate.adjacency &&
        typeof candidate.adjacency === "object"
          ? candidate.adjacency as Readonly<Record<string, readonly string[]>>
          : {},
      graphHash:
        typeof candidate.graphHash === "string"
          ? candidate.graphHash
          : "UNSPECIFIED_GRAPH_HASH"
    }
  }

  return {
    roots: [],
    adjacency: {},
    graphHash: "UNSPECIFIED_GRAPH_HASH"
  }
}

export const projectRecords = projectCanonicalDAG;
