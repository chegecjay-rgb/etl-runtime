import assert from "node:assert/strict";

import {
  detectUndeclaredAuthority
} from "../../authority/undeclared.js";

import type {
  AuthorityContinuityResult
} from "../../authority/continuity.js";

const continuityResult: AuthorityContinuityResult = Object.freeze({
  states: Object.freeze([
    Object.freeze({
      authorityId: "executor.alpha",
      state: "VALID"
    }),
    Object.freeze({
      authorityId: "executor.unknown",
      state: "UNDECLARED"
    })
  ]),
  continuity: Object.freeze([
    Object.freeze({
      authorityId: "executor.alpha",
      lineage: Object.freeze(["node-a"]),
      state: "VALID"
    }),
    Object.freeze({
      authorityId: "executor.unknown",
      lineage: Object.freeze([]),
      state: "UNDECLARED"
    })
  ]),
  violations: Object.freeze([])
});

const result = detectUndeclaredAuthority(
  continuityResult
);

assert.deepStrictEqual(result.undeclared, [
  {
    authorityId: "executor.unknown",
    lineage: [],
    state: "UNDECLARED"
  }
]);

assert.deepStrictEqual(result.paths, [
  {
    authorityId: "executor.unknown",
    visitedNodeIds: []
  }
]);

assert.deepStrictEqual(result.discontinuities, [
  {
    authorityId: "executor.unknown",
    reason: "UNDECLARED",
    state: "UNDECLARED"
  }
]);

assert.equal(
  Object.isFrozen(result),
  true
);

assert.equal(
  Object.isFrozen(result.undeclared),
  true
);

assert.equal(
  Object.isFrozen(result.paths),
  true
);

assert.equal(
  Object.isFrozen(result.discontinuities),
  true
);

console.log(
  "TASK-007 undeclared authority tests passed"
);
