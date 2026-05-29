import type { CanonicalGraph } from "./types.js";

export type CanonicalAuthorityViolation =
  Readonly<{
    nodeId: string;
    parentId: string;
    nodeAuthority: string;
    parentAuthority: string;
  }>;

export type CanonicalAuthorityValidation =
  Readonly<{
    state:
      | "VALID"
      | "INVALID";
    violations:
      readonly CanonicalAuthorityViolation[];
  }>;

export function validateAuthority(
  graph: CanonicalGraph
): CanonicalAuthorityValidation {

  const nodeMap =
    new Map(
      graph.nodes.map(
        (node) => [node.id, node]
      )
    );

  const violations:
    CanonicalAuthorityViolation[] = [];

  for (const node of graph.nodes) {

    for (const parentId of node.parents) {

      const parent =
        nodeMap.get(parentId);

      if (!parent) {
        continue;
      }

      if (
        parent.authority !==
        node.authority
      ) {

        violations.push(
          Object.freeze({
            nodeId: node.id,
            parentId,
            nodeAuthority:
              node.authority,
            parentAuthority:
              parent.authority
          })
        );
      }
    }
  }

  return Object.freeze({
    state:
      violations.length === 0
        ? "VALID"
        : "INVALID",
    violations:
      Object.freeze(violations)
  });
}
