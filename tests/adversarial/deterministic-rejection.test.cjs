const assert = require("assert");

const first = Object.freeze({
  status: "REJECTED",
  rejectionCode: "MALFORMED_EVIDENCE",
  message: "invalid replay payload"
});

const second = Object.freeze({
  status: "REJECTED",
  rejectionCode: "MALFORMED_EVIDENCE",
  message: "invalid replay payload"
});

assert.deepStrictEqual(first, second);

console.log("deterministic rejection test passed");
