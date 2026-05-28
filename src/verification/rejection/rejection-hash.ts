import { createHash } from "crypto";
import {
  RejectionManifest,
  serializeRejectionManifest
} from "./rejection-manifest";

export function computeRejectionHash(
  manifest: RejectionManifest
): string {
  return createHash("sha256")
    .update(serializeRejectionManifest(manifest))
    .digest("hex");
}
