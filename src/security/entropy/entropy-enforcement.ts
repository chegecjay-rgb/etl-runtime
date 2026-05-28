export const BLOCKED_ENTROPY_SURFACES = Object.freeze([
  "Date.now",
  "new Date",
  "Math.random",
  "performance.now",
  "process.env",
  "crypto.randomUUID",
  "fetch",
  "XMLHttpRequest",
  "WebSocket",
  "navigator",
  "window"
] as const);

export interface EntropyViolation {
  readonly status: "REJECTED";
  readonly reason: "ENTROPY_SURFACE_DETECTED";
  readonly surface: string;
}

export function detectEntropyViolation(
  source: string
): EntropyViolation | null {
  for (const surface of BLOCKED_ENTROPY_SURFACES) {
    if (source.includes(surface)) {
      return Object.freeze({
        status: "REJECTED" as const,
        reason: "ENTROPY_SURFACE_DETECTED" as const,
        surface
      });
    }
  }

  return null;
}
