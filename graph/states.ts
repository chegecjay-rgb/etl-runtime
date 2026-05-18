export const CONSISTENCY_STATES = [
  "VALID",
  "INVALID",
  "INCONSISTENT",
  "UNKNOWN"
] as const;

export type ConsistencyState =
  typeof CONSISTENCY_STATES[number];

export function isConsistencyState(
  value: unknown
): value is ConsistencyState {
  return (
    typeof value === "string" &&
    CONSISTENCY_STATES.includes(
      value as ConsistencyState
    )
  );
}

export function assertConsistencyState(
  value: unknown
): ConsistencyState {
  if (!isConsistencyState(value)) {
    throw new Error(
      `Invalid consistency state: ${String(value)}`
    );
  }

  return value;
}
