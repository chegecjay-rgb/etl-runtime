test("constitutional certification", () => {
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert";
import { spawnSync  } from "node:child_process";

const fixturesDirectory =
  path.resolve(
    "fixtures/task015"
  );

fs.mkdirSync(
  fixturesDirectory,
  {
    recursive: true
  }
);

const evidencePath =
  path.join(
    fixturesDirectory,
    "verify-valid.json"
  );

fs.writeFileSync(
  evidencePath,
  JSON.stringify({
    status: "VALID"
  }),
  "utf8"
);

const execution = spawnSync(
  "node",
  [
    "-r",
    "ts-node/register",
    "cli/verify.ts",
    evidencePath
  ],
  {
    cwd: path.resolve("."),
    encoding: "utf8"
  }
);

assert.deepStrictEqual(
  execution.status,
  0
);

assert.deepStrictEqual(
  execution.stdout.trim(),
  JSON.stringify({
    status: "VALID",
    certificationHash:
      "eyJzdGF0dXMiOiJWQUxJRCJ9"
  })
);

const invalidExecution =
  spawnSync(
    "node",
    [
      "-r",
      "ts-node/register",
      "cli/verify.ts"
    ],
    {
      cwd: path.resolve("."),
      encoding: "utf8"
    }
  );

assert.deepStrictEqual(
  invalidExecution.status,
  10
);

assert.deepStrictEqual(
  invalidExecution.stdout.trim(),
  JSON.stringify({
    status:
      "INVALID_ARGUMENT"
  })
);

process.stdout.write(
  "TASK-015 verify entrypoint tests passed\n"
);
})
