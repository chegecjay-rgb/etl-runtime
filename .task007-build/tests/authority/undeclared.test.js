"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const undeclared_1 = require("../../authority/undeclared");
const continuityResult = Object.freeze({
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
const result = (0, undeclared_1.detectUndeclaredAuthority)(continuityResult);
strict_1.default.deepEqual(result.undeclared, [
    {
        authorityId: "executor.unknown",
        lineage: [],
        state: "UNDECLARED"
    }
]);
strict_1.default.deepEqual(result.paths, [
    {
        authorityId: "executor.unknown",
        visitedNodeIds: []
    }
]);
strict_1.default.deepEqual(result.discontinuities, [
    {
        authorityId: "executor.unknown",
        reason: "UNDECLARED",
        state: "UNDECLARED"
    }
]);
strict_1.default.equal(Object.isFrozen(result), true);
strict_1.default.equal(Object.isFrozen(result.undeclared), true);
strict_1.default.equal(Object.isFrozen(result.paths), true);
strict_1.default.equal(Object.isFrozen(result.discontinuities), true);
console.log("TASK-007 undeclared authority tests passed");
