

import { createHash  } from "crypto";
import { serializeRejectionManifest } from "./rejection-manifest.js";
import type { RejectionManifest } from "./rejection-manifest.js";;

export function computeRejectionHash(
  manifest: RejectionManifest
): string {
  return createHash("sha256")
    .update(serializeRejectionManifest(manifest))
    .digest("hex");
}
