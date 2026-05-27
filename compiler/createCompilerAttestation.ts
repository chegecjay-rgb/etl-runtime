import fs from "node:fs"
import path from "node:path"

import { canonicalHash } from "../replay/hashing/canonicalHash"
import {
  canonicalStringify,
  type CanonicalValue
} from "../replay/serialization/canonicalStringify"

export type CompilerAttestation = Readonly<{
  tsconfigPath: string
  compilerHash: string
  deterministic: true
  isolated: true
  mutableRootInheritance: false
}>

function normalizeJson(
  value: CanonicalValue
): string {
  return canonicalStringify(value)
}

export function createCompilerAttestation(
  tsconfigPath: string
): CompilerAttestation {
  const absolutePath = path.resolve(tsconfigPath)

  const parsed = JSON.parse(
    fs.readFileSync(absolutePath, "utf8")
  ) as CanonicalValue

  const normalized = normalizeJson(parsed)

  return {
    tsconfigPath: absolutePath,
    compilerHash: canonicalHash(normalized),
    deterministic: true,
    isolated: true,
    mutableRootInheritance: false
  }
}
