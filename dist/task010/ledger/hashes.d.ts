import { CertificationEntry, CertificationLineage, JsonValue, SnapshotReference } from "./types";
export declare function canonicalize(value: JsonValue): string;
export declare function deterministicHash(value: JsonValue): string;
export declare function hashEntry(entry: CertificationEntry): string;
export declare function hashLineage(lineage: CertificationLineage): string;
export declare function hashSnapshot(snapshot: SnapshotReference): string;
