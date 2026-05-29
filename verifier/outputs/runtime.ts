import type { VerificationState } from "../../outputs/states.js";

import {
  deepFreeze
} from "../../outputs/immutable.js";

import {
  formatVerificationOutput,
  FormattedVerificationOutput
} from "../../outputs/format.js";

import {
  certifyOutput,
  OutputCertification
} from "../../outputs/certify.js";

import {
  inspectCertification,
  OutputDiagnostics
} from "../../outputs/diagnostics.js";

export interface UnifiedVerificationRuntimeOutput {
  readonly state: VerificationState;
  readonly formatted: FormattedVerificationOutput;
  readonly certification: OutputCertification;
  readonly diagnostics: OutputDiagnostics;
}

export function runVerificationOutputRuntime(
  state: VerificationState
): Readonly<UnifiedVerificationRuntimeOutput> {
  const formatted =
    formatVerificationOutput(state);

  const certification =
    certifyOutput(formatted);

  const diagnostics =
    inspectCertification(certification);

  return deepFreeze({
    state,
    formatted,
    certification,
    diagnostics
  });
}
