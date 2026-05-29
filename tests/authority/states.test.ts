import assert from "node:assert/strict";

import {
  AUTHORITY_STATE_ORDER,
  AuthorityStates,
  isAuthorityState
} from "../../authority/states.js";

assert.equal(isAuthorityState(AuthorityStates.VALID), true);
assert.equal(isAuthorityState(AuthorityStates.INVALID), true);
assert.equal(isAuthorityState("BROKEN"), false);

assert.deepStrictEqual(AUTHORITY_STATE_ORDER, [
  AuthorityStates.INVALID,
  AuthorityStates.UNDECLARED,
  AuthorityStates.UNKNOWN,
  AuthorityStates.VALID
]);

console.log("TASK-007 authority state tests passed");
