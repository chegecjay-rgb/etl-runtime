export type ContinuityState =
  | "resolved"
  | "root"
  | "unknown-parent"
  | "invalid";

export interface CanonicalEvidenceRecord {
  readonly executionId: string;
  readonly parentExecutionId: string | null;
  readonly batchId: string | null;
  readonly batchIndex: number | null;
  readonly timestamp: string;
  readonly evidenceHash: string;
}

export interface CanonicalEvidenceSet {
  readonly records: readonly CanonicalEvidenceRecord[];
}

export interface CanonicalExecutionNode {
  readonly executionId: string;
  readonly parentExecutionId: string | null;

  readonly batchId: string | null;
  readonly batchIndex: number | null;

  readonly timestamp: string;

  readonly evidenceHash: string;

  readonly lineageDepth: number | null;

  readonly continuityState: ContinuityState;

  readonly children: readonly string[];
}

export interface CanonicalExecutionProjection {
  readonly projectionHash: string;

  readonly nodes: readonly CanonicalExecutionNode[];

  readonly roots: readonly string[];

  readonly unresolved: readonly string[];

  readonly canonicalOrdering: readonly string[];
}
