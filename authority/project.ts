import type { deepFreeze, type DeepReadonly } from "./immutable.js";
import type {
  DeclarationIndex,
  ResolvedAuthorityDeclaration
} from "./declarations.js";

export interface AuthorityProjectionNode {
  readonly nodeId: string;
  readonly authorityId: string;
}

export interface AuthorityProjectionEdge {
  readonly fromNodeId: string;
  readonly toNodeId: string;
}

export interface AuthorityProjectionGraph {
  readonly nodes: readonly DeepReadonly<AuthorityProjectionNode>[];
  readonly edges: readonly DeepReadonly<AuthorityProjectionEdge>[];
}

export interface ProjectedAuthorityPath {
  readonly authorityId: string;
  readonly nodePath: readonly string[];
}

function sortNodeIds(
  nodeIds: readonly string[]
): readonly string[] {
  return Object.freeze(
    [...new Set(nodeIds)]
      .map((nodeId) => nodeId.trim())
      .filter((nodeId) => nodeId.length > 0)
      .sort((left, right) => left.localeCompare(right))
  );
}

function sortEdges(
  edges: readonly AuthorityProjectionEdge[]
): readonly DeepReadonly<AuthorityProjectionEdge>[] {
  return Object.freeze(
    [...edges]
      .map((edge) =>
        deepFreeze({
          fromNodeId: edge.fromNodeId.trim(),
          toNodeId: edge.toNodeId.trim()
        })
      )
      .sort((left, right) => {
        const fromOrder = left.fromNodeId.localeCompare(
          right.fromNodeId
        );

        if (fromOrder !== 0) {
          return fromOrder;
        }

        return left.toNodeId.localeCompare(
          right.toNodeId
        );
      })
  );
}

function projectNode(
  declaration: DeepReadonly<ResolvedAuthorityDeclaration>
): DeepReadonly<AuthorityProjectionNode> {
  return deepFreeze({
    nodeId: declaration.nodeId,
    authorityId: declaration.authority.authorityId
  });
}

export function createAuthorityProjectionGraph(
  declarationIndex: DeclarationIndex,
  edges: readonly AuthorityProjectionEdge[]
): DeepReadonly<AuthorityProjectionGraph> {
  const sortedNodeIds = sortNodeIds(
    [...declarationIndex.keys()]
  );

  const projectedNodes = Object.freeze(
    sortedNodeIds.map((nodeId) => {
      const declaration = declarationIndex.get(nodeId);

      if (!declaration) {
        throw new Error(
          `missing declaration for projection node: ${nodeId}`
        );
      }

      return projectNode(declaration);
    })
  );

  return deepFreeze({
    nodes: projectedNodes,
    edges: sortEdges(edges)
  });
}

export function projectAuthorityPaths(
  graph: AuthorityProjectionGraph
): readonly DeepReadonly<ProjectedAuthorityPath>[] {
  return Object.freeze(
    graph.nodes
      .map((node) =>
        deepFreeze({
          authorityId: node.authorityId,
          nodePath: Object.freeze([node.nodeId])
        })
      )
      .sort((left, right) =>
        left.authorityId.localeCompare(
          right.authorityId
        )
      )
  );
}
