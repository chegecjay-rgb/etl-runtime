import assert from "node:assert";

import {
  EXIT_CODES,
  formatCliOutput
} from "../../cli/output";

const deterministicOutput =
  formatCliOutput({
    status: "VALID",
    certificationHash:
      "abc123"
  });

assert.deepStrictEqual(
  deterministicOutput,
  JSON.stringify({
    status: "VALID",
    certificationHash:
      "abc123"
  })
);

assert.deepStrictEqual(
  EXIT_CODES.VALID,
  0
);

assert.deepStrictEqual(
  EXIT_CODES.INVALID_ARGUMENT,
  10
);

assert.throws(
  () => {
    formatCliOutput({
      status:
        "BROKEN" as never,
      certificationHash:
        "abc123"
    });
  },
  (error: unknown) => {
    return (
      error instanceof Error &&
      error.message ===
        "INVALID_MACHINE_STATE"
    );
  }
);

assert.throws(
  () => {
    formatCliOutput({
      status: "VALID",
      certificationHash: ""
    });
  },
  (error: unknown) => {
    return (
      error instanceof Error &&
      error.message ===
        "INVALID_CERTIFICATION_HASH"
    );
  }
);

process.stdout.write(
  "TASK-015 deterministic emission tests passed\n"
);
