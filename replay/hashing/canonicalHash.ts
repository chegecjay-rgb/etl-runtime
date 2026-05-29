import type { createHash } from "node:crypto"
import {
  canonicalStringify,
  type CanonicalValue
} from "../serialization/canonicalStringify.js"

export function canonicalHash(value: CanonicalValue): string {
  return createHash("sha256")
    .update(canonicalStringify(value), "utf8")
    .digest("hex")
}
