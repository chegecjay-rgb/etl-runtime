import { deepFreeze, type DeepReadonly } from "./immutable.js";
import type {
  AuthorityTraversalPath,
  DelegationTraversalResult
} from "./traversal.js";

export interface DelegationEdge {
  readonly authorityId: string;
  readonly delegatedAuthorityId: string;
}

export interface DelegationLineage {
  readonly authorityId: string;
  readonly lineage: readonly string[];
}

export interface DelegationContinuityState {
  readonly authorityId: string;
  readonly valid: boolean;
}

export interface ResolvedDelegationPath {
  readonly authorityId: string;
  readonly visitedNodeIds: readonly string[];
}

export interface DelegationVerificationResult {
  readonly lineages: readonly DeepReadonly<DelegationLineage>[];
  readonly states: readonly DeepReadonly<DelegationContinuityState>[];
  readonly paths: readonly DeepReadonly<ResolvedDelegationPath>[];
}

function sortPaths(
  paths: readonly AuthorityTraversalPath[]
): readonly AuthorityTraversalPath[] {
  return Object.freeze(
    [...paths].sort((left, right) => {
      const authorityOrder = left.authorityId.localeCompare(
        right.authorityId
      );

      if (authorityOrder !== 0) {
        return authorityOrder;
      }

      return left.visitedNodeIds.join(":").localeCompare(
        right.visitedNodeIds.join(":")
      );
    })
  );
}

function createLineage(
  path: AuthorityTraversalPath
): DeepReadonly<DelegationLineage> {
  return deepFreeze({
    authorityId: path.authorityId,
    lineage: Object.freeze([...path.visitedNodeIds])
  });
}

function createState(
  path: AuthorityTraversalPath
): DeepReadonly<DelegationContinuityState> {
  return deepFreeze({
    authorityId: path.authorityId,
    valid: path.visitedNodeIds.length > 0
  });
}

function createResolvedPath(
  path: AuthorityTraversalPath
): DeepReadonly<ResolvedDelegationPath> {
  return deepFreeze({
    authorityId: path.authorityId,
    visitedNodeIds: Object.freeze([
      ...path.visitedNodeIds
    ])
  });
}

export function verifyDelegationContinuity(
  traversal: DelegationTraversalResult
): DeepReadonly<DelegationVerificationResult> {
  const sortedPaths = sortPaths(traversal.paths);

  return deepFreeze({
    lineages: Object.freeze(
      sortedPaths.map((path) =>
        createLineage(path)
      )
    ),
    states: Object.freeze(
      sortedPaths.map((path) =>
        createState(path)
      )
    ),
    paths: Object.freeze(
      sortedPaths.map((path) =>
        createResolvedPath(path)
      )
    )
  });
}
