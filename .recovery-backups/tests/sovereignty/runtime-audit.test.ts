test("constitutional certification", () => {
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert";

const TARGET_DIRECTORIES = [
  path.resolve("cli"),
  path.resolve("verifier/cli")
] as const;

const FORBIDDEN_PATTERNS = [
  "Date.now",
  "new Date",
  "performance.now",
  "Math.random",
  "crypto.randomUUID",
  "process.env",
  "process.cwd",
  "os.hostname",
  "os.platform",
  "fetch(",
  "axios",
  "http.",
  "https.",
  "console.error("
] as const;

interface AuditViolation {
  readonly filePath: string;
  readonly forbiddenPattern: string;
}

function collectFiles(
  directoryPath: string
): readonly string[] {
  const entries = fs.readdirSync(
    directoryPath,
    {
      withFileTypes: true
    }
  );

  const files: string[] = [];

  for (const entry of entries) {
    const resolvedPath = path.join(
      directoryPath,
      entry.name
    );

    if (entry.isDirectory()) {
      files.push(
        ...collectFiles(
          resolvedPath
        )
      );

      continue;
    }

    if (
      entry.isFile() &&
      resolvedPath.endsWith(".ts")
    ) {
      files.push(resolvedPath);
    }
  }

  return files.sort();
}

function scanFile(
  filePath: string
): readonly AuditViolation[] {
  const source = fs.readFileSync(
    filePath,
    "utf8"
  );

  const violations:
    AuditViolation[] = [];

  for (
    const forbiddenPattern of
    FORBIDDEN_PATTERNS
  ) {
    if (
      source.includes(
        forbiddenPattern
      )
    ) {
      violations.push({
        filePath,
        forbiddenPattern
      });
    }
  }

  return violations;
}

const scannedFiles =
  TARGET_DIRECTORIES.flatMap(
    collectFiles
  );

const violations =
  scannedFiles.flatMap(
    scanFile
  );

assert.deepStrictEqual(
  violations,
  []
);

process.stdout.write(
  "TASK-015 sovereignty audit tests passed\n"
);
})
