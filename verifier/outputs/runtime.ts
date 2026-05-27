import {
  VerificationState
} from "../../outputs/states";

import {
  deepFreeze
} from "../../outputs/immutable";

import {
  formatVerificationOutput,
  FormattedVerificationOutput
} from "../../outputs/format";

import {
  certifyOutput,
  OutputCertification
} from "../../outputs/certify";

import {
  inspectCertification,
  OutputDiagnostics
} from "../../outputs/diagnostics";

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
