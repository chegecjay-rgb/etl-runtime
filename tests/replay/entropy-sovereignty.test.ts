import assert from "node:assert/strict"
import path from "node:path"
import { runEntropyAudit } from "../../replay/entropy/entropyAudit"

const report = runEntropyAudit([
  path.resolve("replay"),
  path.resolve("graph"),
  path.resolve("reconstruction"),
  path.resolve("ordering"),
  path.resolve("authority")
])

assert.ok(report.scannedDirectories.length >= 1)

assert.ok(report.scannedFiles.length >= 1)

assert.deepEqual(report.violations, [])

console.log("entropy-sovereignty.test.ts passed")
