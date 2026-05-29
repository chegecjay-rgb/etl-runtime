import assert from "node:assert/strict"
import path from "node:path"
import type { runEntropyAudit } from "../../replay/entropy/entropyAudit.js"

const report = runEntropyAudit([
  path.resolve("replay"),
  path.resolve("graph"),
  path.resolve("reconstruction"),
  path.resolve("ordering"),
  path.resolve("authority")
])

assert.ok(report.scannedDirectories.length >= 1)

assert.ok(report.scannedFiles.length >= 1)

assert.deepStrictEqual(report.violations, [])

console.log("entropy-sovereignty.test.ts passed")
