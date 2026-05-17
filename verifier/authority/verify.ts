import { deepFreeze, type DeepReadonly } from "../../authority/immutable";

import {
  certifyAuthorityVerification,
  type AuthorityCertification
} from "../../authority/certify";

import {
  verifyAuthorityContinuity,
  type AuthorityContinuityResult
} from "../../authority/continuity";

import {
  createDeclarationIndex,
  type AuthorityDeclaration,
  type DeclarationIndex
} from "../../authority/declarations";

import {
  verifyDelegationContinuity,
  type DelegationVerificationResult
} from "../../authority/delegation";

import {
  createAuthorityHashes,
  type AuthorityHashBundle
} from "../../authority/hashes";

import {
  createAuthorityProjectionGraph,
  type AuthorityProjectionEdge,
  type AuthorityProjectionGraph
} from "../../authority/project";

import {
  traverseAuthorityProjection,
  type DelegationTraversalResult
} from "../../authority/traversal";

import {
  detectUndeclaredAuthority,
  type UndeclaredDetectionResult
} from "../../authority/undeclared";

export interface VerificationPipelineState {
  readonly declarations: number;
  readonly edges: number;
  readonly traversalNodes: number;
}

export interface AuthorityVerificationBundle {
  readonly declarationIndex: DeepReadonly<DeclarationIndex>;
  readonly projection: DeepReadonly<AuthorityProjectionGraph>;
  readonly traversal: DeepReadonly<DelegationTraversalResult>;
  readonly delegation: DeepReadonly<DelegationVerificationResult>;
  readonly continuity: DeepReadonly<AuthorityContinuityResult>;
  readonly undeclared: DeepReadonly<UndeclaredDetectionResult>;
  readonly certification: DeepReadonly<AuthorityCertification>;
  readonly hashes: DeepReadonly<AuthorityHashBundle>;
}

export interface AuthorityVerificationResult {
  readonly pipeline: DeepReadonly<VerificationPipelineState>;
  readonly bundle: DeepReadonly<AuthorityVerificationBundle>;
}

export function verifyAuthorityPipeline(
  declarations: readonly AuthorityDeclaration[],
  edges: readonly AuthorityProjectionEdge[]
): DeepReadonly<AuthorityVerificationResult> {
  const declarationIndex =
    createDeclarationIndex(
      declarations
    );

  const projection =
    createAuthorityProjectionGraph(
      declarationIndex,
      edges
    );

  const traversal =
    traverseAuthorityProjection(
      projection
    );

  const delegation =
    verifyDelegationContinuity(
      traversal
    );

  const continuity =
    verifyAuthorityContinuity(
      delegation
    );

  const undeclared =
    detectUndeclaredAuthority(
      continuity
    );

  const certification =
    certifyAuthorityVerification(
      continuity,
      traversal,
      undeclared
    );

  const hashes =
    createAuthorityHashes(
      continuity,
      traversal,
      certification.snapshot
    );

  return deepFreeze({
    pipeline: deepFreeze({
      declarations:
        declarations.length,
      edges:
        edges.length,
      traversalNodes:
        traversal.traversal.length
    }),
    bundle: deepFreeze({
      declarationIndex,
      projection,
      traversal,
      delegation,
      continuity,
      undeclared,
      certification,
      hashes
    })
  });
}
