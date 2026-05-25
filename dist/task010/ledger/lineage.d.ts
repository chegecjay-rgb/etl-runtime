import { CertificationEntry, CertificationLineage } from "./types";
export declare function createLineage(entries: readonly CertificationEntry[]): CertificationLineage;
export declare function appendEntry(lineage: CertificationLineage, entry: CertificationEntry): CertificationLineage;
