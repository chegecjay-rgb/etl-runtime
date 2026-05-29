

import { serializeRejectionManifest } from "./rejection-manifest.js";
import type { RejectionManifest } from "./rejection-manifest.js";;

export interface SerializedRejectionArtifact {
  readonly stdout: "";
  readonly stderr: string;
  readonly exitCode: 1;
}

export function serializeDeterministicRejection(
  manifest: RejectionManifest
): SerializedRejectionArtifact {
  return Object.freeze({
    stdout: "",
    stderr: serializeRejectionManifest(manifest),
    exitCode: 1 as const
  });
}
