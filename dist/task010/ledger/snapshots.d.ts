import { CertificationLineage, SnapshotReference } from "./types";
export declare function createSnapshot(lineage: CertificationLineage): SnapshotReference;
export declare function snapshotEquals(left: SnapshotReference, right: SnapshotReference): boolean;
