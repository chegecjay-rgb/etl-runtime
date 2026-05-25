import { CertificationLineage, SnapshotReference } from "./types";
export interface LedgerDiagnosticsReport {
    readonly entryCount: number;
    readonly snapshotCount: number;
    readonly lineageId: string;
    readonly entryIds: readonly string[];
    readonly snapshotHashes: readonly string[];
    readonly isEmpty: boolean;
}
export declare function generateLedgerReport(lineage: CertificationLineage, snapshots: readonly SnapshotReference[]): LedgerDiagnosticsReport;
export declare function validateLineageIntegrity(lineage: CertificationLineage): boolean;
export declare function validateSnapshotConsistency(snapshots: readonly SnapshotReference[]): boolean;
export declare function validateReplayContinuity(lineage: CertificationLineage, snapshots: readonly SnapshotReference[]): boolean;
export declare function detectMutationAnomalies(lineage: CertificationLineage): boolean;
