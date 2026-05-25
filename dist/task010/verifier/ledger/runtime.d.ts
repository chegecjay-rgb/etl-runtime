import { CertificationEntry, CertificationLineage, SnapshotReference } from "../../ledger/types";
import { createReplayCheckpoint } from "../../ledger/history";
export interface LedgerBuildInput {
    readonly entries: readonly CertificationEntry[];
}
export interface LedgerBuildOutput {
    readonly lineage: CertificationLineage;
    readonly snapshots: readonly SnapshotReference[];
    readonly checkpoints: readonly ReturnType<typeof createReplayCheckpoint>[];
}
export declare function buildLineageFromEntries(entries: readonly CertificationEntry[]): CertificationLineage;
export declare function buildSnapshotsFromLineage(lineage: CertificationLineage): readonly SnapshotReference[];
export declare function buildReplayChain(lineage: CertificationLineage): readonly ReturnType<typeof createReplayCheckpoint>[];
export declare function runFullDiagnostics(lineage: CertificationLineage, snapshots: readonly SnapshotReference[]): {
    report: import("../../ledger/diagnostics").LedgerDiagnosticsReport;
    lineageValid: boolean;
    replayValid: boolean;
};
export declare function buildLedger(input: LedgerBuildInput): LedgerBuildOutput;
export declare function exportConstitutionalLedger(lineage: CertificationLineage, checkpoints: readonly ReturnType<typeof createReplayCheckpoint>[]): import("../../ledger/types").ImmutableLedgerExport;
