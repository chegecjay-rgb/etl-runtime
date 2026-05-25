import { CertificationLineage, ReplayCheckpoint } from "./types";
export declare function createReplayCheckpoint(lineage: CertificationLineage): ReplayCheckpoint;
export declare function validateReplayEquivalence(left: ReplayCheckpoint, right: ReplayCheckpoint): boolean;
export declare function certifyReplayHistory(checkpoints: readonly ReplayCheckpoint[]): string;
