export const VERIFICATION_STATES = Object.freeze({
  VALID: "VALID",
  INVALID: "INVALID",
  UNDECLARED: "UNDECLARED",
  INCONSISTENT: "INCONSISTENT",
  UNKNOWN: "UNKNOWN"
} as const);

export type VerificationState =
  (typeof VERIFICATION_STATES)[keyof typeof VERIFICATION_STATES];

export const VERIFICATION_STATE_VALUES: readonly VerificationState[] =
  Object.freeze([
    VERIFICATION_STATES.VALID,
    VERIFICATION_STATES.INVALID,
    VERIFICATION_STATES.UNDECLARED,
    VERIFICATION_STATES.INCONSISTENT,
    VERIFICATION_STATES.UNKNOWN
  ] as const);

export function isVerificationState(
  value: unknown
): value is VerificationState {
  return (
    typeof value === "string" &&
    VERIFICATION_STATE_VALUES.includes(
      value as VerificationState
    )
  );
}
