const assert = require("assert");

const BLOCKED_ENTROPY_SURFACES = [
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
];

function detectEntropyViolation(source) {
  for (const surface of BLOCKED_ENTROPY_SURFACES) {
    if (source.includes(surface)) {
      return {
        status: "REJECTED",
        reason: "ENTROPY_SURFACE_DETECTED",
        surface
      };
    }
  }

  return null;
}

const result = detectEntropyViolation(
  "const value = Math.random();"
);

assert.deepStrictEqual(
  result,
  {
    status: "REJECTED",
    reason: "ENTROPY_SURFACE_DETECTED",
    surface: "Math.random"
  }
);

console.log("entropy adversarial deterministic test passed");
