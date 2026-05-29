import type { CanonicalGraphNode } from "./types.js";

export function depthFirstTraversal(
  roots: readonly CanonicalGraphNode[],
  adjacency: ReadonlyMap<string, readonly CanonicalGraphNode[]>
): readonly string[] {
  const visited = new Set<string>();
  const ordered: string[] = [];

  function visit(
    node: CanonicalGraphNode
  ): void {
    if (visited.has(node.id)) {
      return;
    }

    visited.add(node.id);

    const children =
      adjacency.get(node.id) ?? [];

    for (const child of children) {
      visit(child);
    }

    ordered.push(node.id);
  }

  for (const root of roots) {
    visit(root);
  }

  return Object.freeze(
    ordered.slice()
  );
}
