import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import type { validateCliArguments } from "../../cli/validate.js";

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "task015-"));
const evidenceFile = path.join(tempRoot, "evidence.json");

fs.writeFileSync(
  evidenceFile,
  JSON.stringify(
    {
      evidence: []
    },
    null,
    2
  ),
  "utf8"
);

const validResult = validateCliArguments([evidenceFile]);

assert.deepStrictEqual(validResult, {
  ok: true,
  evidencePath: path.resolve(evidenceFile)
});

const invalidArgumentResult = validateCliArguments([]);

assert.deepStrictEqual(invalidArgumentResult, {
  ok: false,
  code: "INVALID_ARGUMENT",
  message: "INVALID_ARGUMENT"
});

const missingFileResult = validateCliArguments([
  path.join(tempRoot, "missing.json")
]);

assert.deepStrictEqual(missingFileResult, {
  ok: false,
  code: "FILE_NOT_FOUND",
  message: "FILE_NOT_FOUND"
});

fs.rmSync(tempRoot, {
  recursive: true,
  force: true
});

console.log("TASK-015 validate runtime tests passed");
