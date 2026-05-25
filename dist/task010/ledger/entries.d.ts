import { CertificationArtifact, CertificationEntry, JsonValue } from "./types";
export interface CreateEntryInput {
    readonly artifactId: string;
    readonly artifactType: string;
    readonly payload: JsonValue;
    readonly lineageHash: string | null;
}
export declare function createArtifact(input: CreateEntryInput): CertificationArtifact;
export declare function createCertificationEntry(input: CreateEntryInput): CertificationEntry;
