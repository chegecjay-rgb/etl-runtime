import type { createHash } from "crypto";
import {
  RejectionManifest,
  serializeRejectionManifest
} from "./rejection-manifest.js";

export function computeRejectionHash(
  manifest: RejectionManifest
): string {
  return createHash("sha256")
    .update(serializeRejectionManifest(manifest))
    .digest("hex");
}
