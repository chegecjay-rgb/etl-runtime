"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const certify_1 = require("../../authority/certify");
const continuity_1 = require("../../authority/continuity");
const declarations_1 = require("../../authority/declarations");
const delegation_1 = require("../../authority/delegation");
const project_1 = require("../../authority/project");
const traversal_1 = require("../../authority/traversal");
const undeclared_1 = require("../../authority/undeclared");
const declarationIndex = (0, declarations_1.createDeclarationIndex)([
    {
        nodeId: "node-a",
        authority: {
            authorityId: "executor.alpha",
            capabilities: ["deploy"],
            delegations: ["delegate.alpha"],
            controlSurfaces: ["governance"]
        }
    },
    {
        nodeId: "node-b",
        authority: {
            authorityId: "executor.beta",
            capabilities: ["mint"],
            delegations: ["delegate.beta"],
            controlSurfaces: ["operations"]
        }
    }
]);
const graph = (0, project_1.createAuthorityProjectionGraph)(declarationIndex, [
    {
        fromNodeId: "node-a",
        toNodeId: "node-b"
    }
]);
const traversal = (0, traversal_1.traverseAuthorityProjection)(graph);
const delegation = (0, delegation_1.verifyDelegationContinuity)(traversal);
const continuity = (0, continuity_1.verifyAuthorityContinuity)(delegation);
const undeclared = (0, undeclared_1.detectUndeclaredAuthority)(continuity);
const certification = (0, certify_1.certifyAuthorityVerification)(continuity, traversal, undeclared);
const replayCertification = (0, certify_1.certifyAuthorityVerification)(continuity, traversal, undeclared, certification.snapshot);
strict_1.default.deepEqual(certification.snapshot, replayCertification.snapshot);
strict_1.default.deepEqual(certification.equivalence, {
    equivalent: true,
    continuityEquivalent: true,
    traversalEquivalent: true,
    undeclaredEquivalent: true
});
strict_1.default.deepEqual(certification.diagnostics, {
    continuityCount: 3,
    traversalCount: 3,
    undeclaredCount: 0
});
strict_1.default.equal(Object.isFrozen(certification), true);
strict_1.default.equal(Object.isFrozen(certification.snapshot), true);
strict_1.default.equal(Object.isFrozen(certification.equivalence), true);
strict_1.default.equal(Object.isFrozen(certification.diagnostics), true);
console.log("TASK-007 authority certification tests passed");
