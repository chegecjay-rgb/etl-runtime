"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
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
const result = (0, delegation_1.verifyDelegationContinuity)(traversal);
strict_1.default.deepEqual(result.lineages, [
    {
        authorityId: "executor.alpha",
        lineage: ["node-a"]
    },
    {
        authorityId: "executor.beta",
        lineage: ["node-a", "node-b"]
    },
    {
        authorityId: "executor.beta",
        lineage: ["node-b"]
    }
]);
strict_1.default.deepEqual(result.states, [
    {
        authorityId: "executor.alpha",
        valid: true
    },
    {
        authorityId: "executor.beta",
        valid: true
    },
    {
        authorityId: "executor.beta",
        valid: true
    }
]);
strict_1.default.deepEqual(result.paths, [
    {
        authorityId: "executor.alpha",
        visitedNodeIds: ["node-a"]
    },
    {
        authorityId: "executor.beta",
        visitedNodeIds: ["node-a", "node-b"]
    },
    {
        authorityId: "executor.beta",
        visitedNodeIds: ["node-b"]
    }
]);
strict_1.default.equal(Object.isFrozen(result), true);
strict_1.default.equal(Object.isFrozen(result.lineages), true);
strict_1.default.equal(Object.isFrozen(result.states), true);
strict_1.default.equal(Object.isFrozen(result.paths), true);
console.log("TASK-007 delegation continuity tests passed");
