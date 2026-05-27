import fs from "node:fs";
import path from "node:path";
import assert from "node:assert";
import {
  spawnSync
} from "node:child_process";

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
    "replay-equivalence.json"
  );

fs.writeFileSync(
  evidencePath,
  JSON.stringify({
    status: "VALID"
  }),
  "utf8"
);

function executeReplay() {
  return spawnSync(
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
}

const firstExecution =
  executeReplay();

const secondExecution =
  executeReplay();

const thirdExecution =
  executeReplay();

assert.deepStrictEqual(
  firstExecution.status,
  0
);

assert.deepStrictEqual(
  secondExecution.status,
  0
);

assert.deepStrictEqual(
  thirdExecution.status,
  0
);

assert.deepStrictEqual(
  firstExecution.stdout,
  secondExecution.stdout
);

assert.deepStrictEqual(
  secondExecution.stdout,
  thirdExecution.stdout
);

assert.deepStrictEqual(
  firstExecution.stderr,
  secondExecution.stderr
);

assert.deepStrictEqual(
  secondExecution.stderr,
  thirdExecution.stderr
);

assert.deepStrictEqual(
  firstExecution.status,
  secondExecution.status
);

assert.deepStrictEqual(
  secondExecution.status,
  thirdExecution.status
);

assert.deepStrictEqual(
  firstExecution.stdout.trim(),
  JSON.stringify({
    status: "VALID",
    certificationHash:
      "eyJzdGF0dXMiOiJWQUxJRCJ9"
  })
);

assert.deepStrictEqual(
  firstExecution.stderr,
  ""
);

process.stdout.write(
  "TASK-015 replay equivalence tests passed\n"
);
