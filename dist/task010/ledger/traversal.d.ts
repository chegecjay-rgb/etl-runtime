import { CertificationEntry, CertificationLineage } from "./types";
export declare function traverseLineage(lineage: CertificationLineage): readonly CertificationEntry[];
export declare function traverseEntryIds(lineage: CertificationLineage): readonly string[];
export declare function traverseCertificationHashes(lineage: CertificationLineage): readonly string[];
