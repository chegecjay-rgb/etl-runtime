export type Primitive =
  | string
  | number
  | boolean
  | null;

export type JsonObject = {
  readonly [key: string]: JsonValue;
};

export type JsonValue =
  | Primitive
  | readonly JsonValue[]
  | JsonObject;

export type DeepReadonly<T> =
  T extends Primitive
    ? T
    : T extends (...args: any[]) => any
      ? T
      : T extends readonly (infer U)[]
        ? readonly DeepReadonly<U>[]
        : {
            readonly [K in keyof T]: DeepReadonly<T[K]>;
          };

export interface CertificationArtifact extends JsonObject {
  readonly artifactId: string;
  readonly artifactHash: string;
  readonly artifactType: string;
  readonly payload: JsonValue;
}

export interface CertificationEntry extends JsonObject {
  readonly entryId: string;
  readonly artifact: CertificationArtifact;
  readonly lineageHash: string | null;
  readonly certificationHash: string;
}

export interface CertificationLineage extends JsonObject {
  readonly lineageId: string;
  readonly entries: readonly CertificationEntry[];
  readonly lineageHash: string;
}

export interface SnapshotReference extends JsonObject {
  readonly snapshotId: string;
  readonly lineageHash: string;
  readonly snapshotHash: string;
}

export interface ReplayCheckpoint extends JsonObject {
  readonly checkpointId: string;
  readonly snapshot: SnapshotReference;
  readonly replayHash: string;
}

export interface LedgerTraversalNode extends JsonObject {
  readonly entry: CertificationEntry;
  readonly depth: number;
}

export interface CertificationContinuityProof extends JsonObject {
  readonly lineageHash: string;
  readonly snapshotHash: string;
  readonly replayHash: string;
}

export interface ImmutableLedgerExport extends JsonObject {
  readonly lineage: CertificationLineage;
  readonly snapshots: readonly SnapshotReference[];
  readonly checkpoints: readonly ReplayCheckpoint[];
}
