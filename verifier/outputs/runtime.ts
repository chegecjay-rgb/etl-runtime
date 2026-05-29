import type {
  VerificationState
} from "../../outputs/states.js";

import {
  deepFreeze
} from "../../outputs/immutable.js";

import {
  formatVerificationOutput
} from "../../outputs/format.js";

import type {
  FormattedVerificationOutput
} from "../../outputs/format.js";

import {
  certifyOutput
} from "../../outputs/certify.js";

import type {
  OutputCertification
} from "../../outputs/certify.js";

import {
  inspectCertification
} from "../../outputs/diagnostics.js";

import type {
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
