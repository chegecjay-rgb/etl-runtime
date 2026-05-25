import { CertificationLineage, ImmutableLedgerExport, ReplayCheckpoint } from "./types";
export declare function exportLedger(lineage: CertificationLineage, checkpoints: readonly ReplayCheckpoint[]): ImmutableLedgerExport;
export declare function exportEquals(left: ImmutableLedgerExport, right: ImmutableLedgerExport): boolean;
