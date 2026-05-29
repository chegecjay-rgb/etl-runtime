test("constitutional certification", () => {
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert";

import {
  executeVerifierRuntime
} from "../../verifier/cli/runtime.js";

const fixturesDirectory = path.resolve(
  "fixtures/task015"
);

fs.mkdirSync(
  fixturesDirectory,
  {
    recursive: true
  }
);

const validEvidencePath = path.join(
  fixturesDirectory,
  "valid-evidence.json"
);

fs.writeFileSync(
  validEvidencePath,
  JSON.stringify({
    status: "VALID"
  }),
  "utf8"
);

const executionResult =
  executeVerifierRuntime(
    validEvidencePath
  );

assert.deepStrictEqual(
  executionResult,
  {
    status: "VALID",
    certificationHash:
      "eyJzdGF0dXMiOiJWQUxJRCJ9"
  }
);

const malformedEvidencePath =
  path.join(
    fixturesDirectory,
    "malformed-evidence.json"
  );

fs.writeFileSync(
  malformedEvidencePath,
  "{invalid",
  "utf8"
);

assert.throws(
  () => {
    executeVerifierRuntime(
      malformedEvidencePath
    );
  },
  (error: unknown) => {
    return (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (
        error as {
          code: string;
        }
      ).code ===
        "MALFORMED_EVIDENCE"
    );
  }
);

process.stdout.write(
  "TASK-015 runtime bridge tests passed\n"
);
})
