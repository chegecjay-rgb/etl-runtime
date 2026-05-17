export const AuthorityStates = {
  VALID: "VALID",
  INVALID: "INVALID",
  UNDECLARED: "UNDECLARED",
  UNKNOWN: "UNKNOWN"
} as const;

export type AuthorityState =
  (typeof AuthorityStates)[keyof typeof AuthorityStates];

export const AUTHORITY_STATE_ORDER: readonly AuthorityState[] = Object.freeze([
  AuthorityStates.INVALID,
  AuthorityStates.UNDECLARED,
  AuthorityStates.UNKNOWN,
  AuthorityStates.VALID
]);

export function isAuthorityState(value: unknown): value is AuthorityState {
  return (
    typeof value === "string" &&
    AUTHORITY_STATE_ORDER.includes(value as AuthorityState)
  );
}
