import {
  VerificationState,
  VERIFICATION_STATES
} from "./states.js";

export interface ResolutionInputs {
  readonly hasRuleViolations: boolean;
  readonly hasUndeclaredAuthorities: boolean;
  readonly hasReplayDivergence: boolean;
  readonly hasUnknownEvidence: boolean;
}

const RESOLUTION_ORDER: readonly VerificationState[] = Object.freeze([
  VERIFICATION_STATES.INCONSISTENT,
  VERIFICATION_STATES.INVALID,
  VERIFICATION_STATES.UNDECLARED,
  VERIFICATION_STATES.UNKNOWN,
  VERIFICATION_STATES.VALID
] as const);

export function resolveVerificationState(
  inputs: ResolutionInputs
): VerificationState {
  const candidates = new Map<VerificationState, boolean>([
    [
      VERIFICATION_STATES.INCONSISTENT,
      inputs.hasReplayDivergence
    ],
    [
      VERIFICATION_STATES.INVALID,
      inputs.hasRuleViolations
    ],
    [
      VERIFICATION_STATES.UNDECLARED,
      inputs.hasUndeclaredAuthorities
    ],
    [
      VERIFICATION_STATES.UNKNOWN,
      inputs.hasUnknownEvidence
    ],
    [
      VERIFICATION_STATES.VALID,
      !inputs.hasReplayDivergence &&
      !inputs.hasRuleViolations &&
      !inputs.hasUndeclaredAuthorities &&
      !inputs.hasUnknownEvidence
    ]
  ]);

  for (const state of RESOLUTION_ORDER) {
    if (candidates.get(state) === true) {
      return state;
    }
  }

  return VERIFICATION_STATES.UNKNOWN;
}

export function getResolutionOrder():
readonly VerificationState[] {
  return RESOLUTION_ORDER;
}
