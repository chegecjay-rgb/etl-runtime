"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const continuity_1 = require("../../authority/continuity");
const declarations_1 = require("../../authority/declarations");
const delegation_1 = require("../../authority/delegation");
const project_1 = require("../../authority/project");
const traversal_1 = require("../../authority/traversal");
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
const result = (0, continuity_1.verifyAuthorityContinuity)(delegation);
strict_1.default.deepEqual(result.states, [
    {
        authorityId: "executor.alpha",
        state: "VALID"
    },
    {
        authorityId: "executor.beta",
        state: "VALID"
    },
    {
        authorityId: "executor.beta",
        state: "VALID"
    }
]);
strict_1.default.deepEqual(result.continuity, [
    {
        authorityId: "executor.alpha",
        lineage: ["node-a"],
        state: "VALID"
    },
    {
        authorityId: "executor.beta",
        lineage: ["node-a", "node-b"],
        state: "VALID"
    },
    {
        authorityId: "executor.beta",
        lineage: ["node-b"],
        state: "VALID"
    }
]);
strict_1.default.deepEqual(result.violations, []);
strict_1.default.equal(Object.isFrozen(result), true);
strict_1.default.equal(Object.isFrozen(result.states), true);
strict_1.default.equal(Object.isFrozen(result.continuity), true);
strict_1.default.equal(Object.isFrozen(result.violations), true);
console.log("TASK-007 authority continuity tests passed");
