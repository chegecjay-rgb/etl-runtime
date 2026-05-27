import fs from "node:fs"
import path from "node:path"

export type EntropyViolation = Readonly<{
  file: string
  token: string
}>

export type EntropyAuditReport = Readonly<{
  scannedDirectories: readonly string[]
  scannedFiles: readonly string[]
  violations: readonly EntropyViolation[]
}>

const BLOCKED_TOKENS = [
  "Date.now",
  "new Date",
  "Math.random",
  "performance.now",
  "process.env",
  "crypto.randomUUID",
  "fetch(",
  "XMLHttpRequest",
  "WebSocket",
  "navigator.",
  "window."
] as const

const EXCLUDED_FILES = [
  "replay/entropy/entropyAudit.ts"
] as const

function normalizePath(value: string): string {
  return value.replace(/\\/g, "/")
}

function isExcludedFile(file: string): boolean {
  const normalized = normalizePath(file)

  return EXCLUDED_FILES.some((entry) =>
    normalized.endsWith(entry)
  )
}

function collectTypeScriptFiles(
  directory: string,
  output: string[]
): void {
  const entries = fs.readdirSync(directory).sort()

  for (const entry of entries) {
    const absolute = path.join(directory, entry)
    const stat = fs.statSync(absolute)

    if (stat.isDirectory()) {
      collectTypeScriptFiles(absolute, output)
      continue
    }

    if (
      absolute.endsWith(".ts")
      && !absolute.endsWith(".test.ts")
      && !isExcludedFile(absolute)
    ) {
      output.push(absolute)
    }
  }
}

export function runEntropyAudit(
  directories: readonly string[]
): EntropyAuditReport {
  const scannedFiles: string[] = []
  const violations: EntropyViolation[] = []

  for (const directory of [...directories].sort()) {
    if (!fs.existsSync(directory)) {
      continue
    }

    collectTypeScriptFiles(directory, scannedFiles)
  }

  scannedFiles.sort()

  for (const file of scannedFiles) {
    const source = fs.readFileSync(file, "utf8")

    for (const token of BLOCKED_TOKENS) {
      if (source.includes(token)) {
        violations.push({
          file,
          token
        })
      }
    }
  }

  return {
    scannedDirectories: [...directories].sort(),
    scannedFiles,
    violations
  }
}
