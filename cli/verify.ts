import {
  validateCliArguments
} from "./validate";

import {
  emitCliOutput,
  EXIT_CODES
} from "./output";

import {
  executeVerifierRuntime
} from "../verifier/cli/runtime";

type ExitCode =
  (typeof EXIT_CODES)[
    keyof typeof EXIT_CODES
  ];

function resolveExitCode(
  status: string
): ExitCode {
  switch (status) {
    case "VALID":
      return EXIT_CODES.VALID;

    case "INVALID":
      return EXIT_CODES.INVALID;

    case "UNDECLARED":
      return EXIT_CODES.UNDECLARED;

    case "INCONSISTENT":
      return EXIT_CODES.INCONSISTENT;

    default:
      return EXIT_CODES.UNKNOWN;
  }
}

function main(): ExitCode {
  const validation =
    validateCliArguments(
      process.argv.slice(2)
    );

  if (!validation.ok) {
    process.stdout.write(
      JSON.stringify({
        status:
          validation.code
      }) + "\n"
    );

    return EXIT_CODES[
      validation.code
    ];
  }

  try {
    const result =
      executeVerifierRuntime(
        validation.evidencePath
      );

    emitCliOutput(result);

    return resolveExitCode(
      result.status
    );
  } catch (
    error: unknown
  ) {
    if (
      typeof error ===
        "object" &&
      error !== null &&
      "code" in error
    ) {
      const failure =
        error as {
          code:
            keyof typeof EXIT_CODES;
        };

      process.stdout.write(
        JSON.stringify({
          status:
            failure.code
        }) + "\n"
      );

      return EXIT_CODES[
        failure.code
      ];
    }

    process.stdout.write(
      JSON.stringify({
        status: "UNKNOWN"
      }) + "\n"
    );

    return EXIT_CODES.UNKNOWN;
  }
}

process.exitCode = main();
