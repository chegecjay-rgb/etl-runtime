"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const verify_1 = require("../../verifier/authority/verify");
const result = (0, verify_1.verifyAuthorityPipeline)([
    {
        nodeId: "node-a",
        authority: {
            authorityId: "executor.alpha",
            capabilities: [
                "deploy"
            ],
            delegations: [
                "delegate.alpha"
            ],
            controlSurfaces: [
                "governance"
            ]
        }
    },
    {
        nodeId: "node-b",
        authority: {
            authorityId: "executor.beta",
            capabilities: [
                "mint"
            ],
            delegations: [
                "delegate.beta"
            ],
            controlSurfaces: [
                "operations"
            ]
        }
    }
], [
    {
        fromNodeId: "node-a",
        toNodeId: "node-b"
    }
]);
strict_1.default.deepEqual(result.pipeline, {
    declarations: 2,
    edges: 1,
    traversalNodes: 3
});
strict_1.default.equal(result.bundle.continuity.states.length, 3);
strict_1.default.equal(result.bundle.undeclared
    .undeclared.length, 0);
strict_1.default.equal(result.bundle.certification
    .equivalence.equivalent, true);
strict_1.default.equal(result.bundle.hashes
    .continuity.algorithm, "sha256");
strict_1.default.equal(result.bundle.hashes
    .continuity.value.length, 64);
strict_1.default.equal(Object.isFrozen(result), true);
strict_1.default.equal(Object.isFrozen(result.bundle), true);
strict_1.default.equal(Object.isFrozen(result.pipeline), true);
console.log("TASK-007 authority verifier integration tests passed");
