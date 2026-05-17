import { deepFreeze, type DeepReadonly } from "./immutable";
import type {
  AuthorityProjectionEdge,
  AuthorityProjectionGraph,
  AuthorityProjectionNode
} from "./project";

export interface AuthorityTraversalNode {
  readonly nodeId: string;
  readonly authorityId: string;
  readonly depth: number;
}

export interface AuthorityTraversalPath {
  readonly authorityId: string;
  readonly visitedNodeIds: readonly string[];
}

export interface TraversalVisitState {
  readonly visited: readonly string[];
}

export interface DelegationTraversalResult {
  readonly traversal: readonly DeepReadonly<AuthorityTraversalNode>[];
  readonly paths: readonly DeepReadonly<AuthorityTraversalPath>[];
}

function sortNodes(
  nodes: readonly AuthorityProjectionNode[]
): readonly AuthorityProjectionNode[] {
  return Object.freeze(
    [...nodes].sort((left, right) =>
      left.nodeId.localeCompare(right.nodeId)
    )
  );
}

function sortEdges(
  edges: readonly AuthorityProjectionEdge[]
): readonly AuthorityProjectionEdge[] {
  return Object.freeze(
    [...edges].sort((left, right) => {
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

function buildAdjacencyMap(
  edges: readonly AuthorityProjectionEdge[]
): ReadonlyMap<string, readonly string[]> {
  const adjacency = new Map<string, string[]>();

  for (const edge of sortEdges(edges)) {
    const next = adjacency.get(edge.fromNodeId) ?? [];

    next.push(edge.toNodeId);

    adjacency.set(
      edge.fromNodeId,
      [...new Set(next)].sort((left, right) =>
        left.localeCompare(right)
      )
    );
  }

  return deepFreeze(adjacency);
}

function visitNode(
  nodeId: string,
  graph: AuthorityProjectionGraph,
  adjacency: ReadonlyMap<string, readonly string[]>,
  state: TraversalVisitState,
  depth: number,
  traversal: AuthorityTraversalNode[],
  paths: AuthorityTraversalPath[]
): void {
  if (state.visited.includes(nodeId)) {
    return;
  }

  const node = graph.nodes.find(
    (candidate) => candidate.nodeId === nodeId
  );

  if (!node) {
    throw new Error(
      `missing projection node during traversal: ${nodeId}`
    );
  }

  const nextVisited = Object.freeze([
    ...state.visited,
    nodeId
  ]);

  traversal.push(
    deepFreeze({
      nodeId: node.nodeId,
      authorityId: node.authorityId,
      depth
    })
  );

  paths.push(
    deepFreeze({
      authorityId: node.authorityId,
      visitedNodeIds: nextVisited
    })
  );

  const nextNodes = adjacency.get(nodeId) ?? [];

  for (const nextNodeId of nextNodes) {
    visitNode(
      nextNodeId,
      graph,
      adjacency,
      deepFreeze({
        visited: nextVisited
      }),
      depth + 1,
      traversal,
      paths
    );
  }
}

export function traverseAuthorityProjection(
  graph: AuthorityProjectionGraph
): DeepReadonly<DelegationTraversalResult> {
  const traversal: AuthorityTraversalNode[] = [];
  const paths: AuthorityTraversalPath[] = [];

  const adjacency = buildAdjacencyMap(graph.edges);

  for (const node of sortNodes(graph.nodes)) {
    visitNode(
      node.nodeId,
      graph,
      adjacency,
      deepFreeze({
        visited: Object.freeze([])
      }),
      0,
      traversal,
      paths
    );
  }

  return deepFreeze({
    traversal: Object.freeze(
      traversal.sort((left, right) => {
        const depthOrder = left.depth - right.depth;

        if (depthOrder !== 0) {
          return depthOrder;
        }

        return left.nodeId.localeCompare(
          right.nodeId
        );
      })
    ),
    paths: Object.freeze(
      paths.sort((left, right) =>
        left.authorityId.localeCompare(
          right.authorityId
        )
      )
    )
  });
}
