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
const hashes_1 = require("../../authority/hashes");
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
const hashes = (0, hashes_1.createAuthorityHashes)(continuity, traversal, certification.snapshot);
const replayHashes = (0, hashes_1.createAuthorityHashes)(continuity, traversal, certification.snapshot);
strict_1.default.deepEqual(hashes, replayHashes);
strict_1.default.equal(hashes.continuity.algorithm, "sha256");
strict_1.default.equal(hashes.traversal.traversal.algorithm, "sha256");
strict_1.default.equal(hashes.certification.certification.algorithm, "sha256");
strict_1.default.equal(hashes.continuity.value.length, 64);
strict_1.default.equal(hashes.traversal.traversal.value.length, 64);
strict_1.default.equal(hashes.certification.certification.value.length, 64);
strict_1.default.equal(Object.isFrozen(hashes), true);
strict_1.default.equal(Object.isFrozen(hashes.continuity), true);
strict_1.default.equal(Object.isFrozen(hashes.traversal), true);
strict_1.default.equal(Object.isFrozen(hashes.certification), true);
console.log("TASK-007 authority hash tests passed");
