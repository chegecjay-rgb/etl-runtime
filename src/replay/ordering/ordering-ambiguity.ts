export interface ReplayOrderingGraph {
  readonly nodes: readonly string[];
  readonly edges: readonly [string, string][];
}

export interface OrderingAmbiguity {
  readonly status: "REJECTED";
  readonly reason: "ORDERING_AMBIGUITY";
}

export function detectOrderingAmbiguity(
  graph: ReplayOrderingGraph
): OrderingAmbiguity | null {
  const incoming = new Map<string, number>();

  for (const node of graph.nodes) {
    incoming.set(node, 0);
  }

  for (const [, target] of graph.edges) {
    incoming.set(
      target,
      (incoming.get(target) ?? 0) + 1
    );
  }

  let available = graph.nodes.filter(
    node => (incoming.get(node) ?? 0) === 0
  );

  if (available.length > 1) {
    return Object.freeze({
      status: "REJECTED" as const,
      reason: "ORDERING_AMBIGUITY" as const
    });
  }

  return null;
}
