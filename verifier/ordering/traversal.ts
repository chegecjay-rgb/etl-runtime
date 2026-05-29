import {
  TraversalNode
} from "../../types/ordering.js";

import {
  lexicalTieBreak
} from "./tieBreaker.js";

export function sortTraversalNodes(
  nodes: readonly TraversalNode[]
): readonly TraversalNode[] {
  const cloned = [...nodes];

  cloned.sort((left, right) =>
    lexicalTieBreak(
      left.id,
      right.id
    )
  );

  return cloned;
}

export function canonicalTraversal(
  nodes: readonly TraversalNode[]
): readonly string[] {
  const ordered =
    sortTraversalNodes(nodes);

  const visited: string[] = [];

  for (const node of ordered) {
    visited.push(node.id);

    const children =
      node.children ?? [];

    const traversed =
      canonicalTraversal(children);

    for (const child of traversed) {
      visited.push(child);
    }
  }

  return visited;
}
