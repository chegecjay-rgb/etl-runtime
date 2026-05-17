"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const states_1 = require("../../authority/states");
strict_1.default.equal((0, states_1.isAuthorityState)(states_1.AuthorityStates.VALID), true);
strict_1.default.equal((0, states_1.isAuthorityState)(states_1.AuthorityStates.INVALID), true);
strict_1.default.equal((0, states_1.isAuthorityState)("BROKEN"), false);
strict_1.default.deepEqual(states_1.AUTHORITY_STATE_ORDER, [
    states_1.AuthorityStates.INVALID,
    states_1.AuthorityStates.UNDECLARED,
    states_1.AuthorityStates.UNKNOWN,
    states_1.AuthorityStates.VALID
]);
console.log("TASK-007 authority state tests passed");
