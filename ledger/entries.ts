import type { immutable } from "./immutable.js";

import type { CertificationArtifact, CertificationEntry, JsonValue } from "./types.js";

import {
  deterministicHash
} from "./hashes.js";

export interface CreateEntryInput {
  readonly artifactId: string;
  readonly artifactType: string;
  readonly payload: JsonValue;
  readonly lineageHash: string | null;
}

export function createArtifact(
  input: CreateEntryInput
): CertificationArtifact {
  const artifactPayload = immutable(input.payload);

  const artifactHash = deterministicHash({
    artifactType: input.artifactType,
    payload: artifactPayload
  });

  return immutable({
    artifactId: input.artifactId,
    artifactHash,
    artifactType: input.artifactType,
    payload: artifactPayload
  });
}

export function createCertificationEntry(
  input: CreateEntryInput
): CertificationEntry {
  const artifact = createArtifact(input);

  const certificationHash = deterministicHash({
    artifact,
    lineageHash: input.lineageHash
  });

  const entryId = deterministicHash({
    certificationHash
  });

  return immutable({
    entryId,
    artifact,
    lineageHash: input.lineageHash,
    certificationHash
  });
}
