import type {
  CanonicalEvidenceIdentifier
} from "./identifiers";

import type {
  DeepReadonly
} from "./readonly";

export type EvidenceKind =
  | "DISCLOSURE"
  | "EXECUTION_EVENT"
  | "ETNL_OUTPUT"
  | "GRAPH_REFERENCE";

export type CanonicalScalar =
  | string
  | number
  | boolean
  | null;

export interface CanonicalObject {
  readonly [key: string]:
    CanonicalValue;
}

export interface CanonicalArray
  extends ReadonlyArray<
    CanonicalValue
  > {}

export type CanonicalValue =
  | CanonicalScalar
  | CanonicalObject
  | CanonicalArray;

export interface CanonicalEvidenceBase {
  readonly schemaVersion: "1.0.0";

  readonly kind: EvidenceKind;

  readonly identifier:
    CanonicalEvidenceIdentifier;

  readonly payload:
    DeepReadonly<
      CanonicalObject
    >;
}

export interface DisclosureEvidence
  extends CanonicalEvidenceBase {
  readonly kind: "DISCLOSURE";
}

export interface ExecutionEventEvidence
  extends CanonicalEvidenceBase {
  readonly kind: "EXECUTION_EVENT";
}

export interface ETNLOutputEvidence
  extends CanonicalEvidenceBase {
  readonly kind: "ETNL_OUTPUT";
}

export interface GraphReferenceEvidence
  extends CanonicalEvidenceBase {
  readonly kind: "GRAPH_REFERENCE";
}

export type CanonicalEvidence =
  | DisclosureEvidence
  | ExecutionEventEvidence
  | ETNLOutputEvidence
  | GraphReferenceEvidence;
