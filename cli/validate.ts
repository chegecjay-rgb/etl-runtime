import fs from "node:fs";
import path from "node:path";

export type CliValidationResult =
  | {
      ok: true;
      evidencePath: string;
    }
  | {
      ok: false;
      code: "INVALID_ARGUMENT" | "FILE_NOT_FOUND";
      message: string;
    };

export function validateCliArguments(argv: readonly string[]): CliValidationResult {
  if (argv.length !== 1) {
    return {
      ok: false,
      code: "INVALID_ARGUMENT",
      message: "INVALID_ARGUMENT"
    };
  }

  const candidate = argv[0];

  if (typeof candidate !== "string" || candidate.trim().length === 0) {
    return {
      ok: false,
      code: "INVALID_ARGUMENT",
      message: "INVALID_ARGUMENT"
    };
  }

  const resolved = path.resolve(candidate);

  if (!fs.existsSync(resolved)) {
    return {
      ok: false,
      code: "FILE_NOT_FOUND",
      message: "FILE_NOT_FOUND"
    };
  }

  const stat = fs.statSync(resolved);

  if (!stat.isFile()) {
    return {
      ok: false,
      code: "FILE_NOT_FOUND",
      message: "FILE_NOT_FOUND"
    };
  }

  return {
    ok: true,
    evidencePath: resolved
  };
}
