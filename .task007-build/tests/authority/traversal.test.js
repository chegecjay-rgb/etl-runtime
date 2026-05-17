"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const declarations_1 = require("../../authority/declarations");
const project_1 = require("../../authority/project");
const traversal_1 = require("../../authority/traversal");
const declarationIndex = (0, declarations_1.createDeclarationIndex)([
    {
        nodeId: "node-c",
        authority: {
            authorityId: "executor.gamma",
            capabilities: ["audit"],
            delegations: ["delegate.gamma"],
            controlSurfaces: ["governance"]
        }
    },
    {
        nodeId: "node-a",
        authority: {
            authorityId: "executor.alpha",
            capabilities: ["deploy"],
            delegations: ["delegate.alpha"],
            controlSurfaces: ["treasury"]
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
    },
    {
        fromNodeId: "node-b",
        toNodeId: "node-c"
    },
    {
        fromNodeId: "node-c",
        toNodeId: "node-a"
    }
]);
const firstTraversal = (0, traversal_1.traverseAuthorityProjection)(graph);
const secondTraversal = (0, traversal_1.traverseAuthorityProjection)(graph);
strict_1.default.deepEqual(firstTraversal, secondTraversal);
strict_1.default.deepEqual(firstTraversal.traversal, [
    {
        nodeId: "node-a",
        authorityId: "executor.alpha",
        depth: 0
    },
    {
        nodeId: "node-b",
        authorityId: "executor.beta",
        depth: 0
    },
    {
        nodeId: "node-c",
        authorityId: "executor.gamma",
        depth: 0
    },
    {
        nodeId: "node-a",
        authorityId: "executor.alpha",
        depth: 1
    },
    {
        nodeId: "node-b",
        authorityId: "executor.beta",
        depth: 1
    },
    {
        nodeId: "node-c",
        authorityId: "executor.gamma",
        depth: 1
    },
    {
        nodeId: "node-a",
        authorityId: "executor.alpha",
        depth: 2
    },
    {
        nodeId: "node-b",
        authorityId: "executor.beta",
        depth: 2
    },
    {
        nodeId: "node-c",
        authorityId: "executor.gamma",
        depth: 2
    }
]);
strict_1.default.equal(firstTraversal.paths.length, 9);
strict_1.default.equal(Object.isFrozen(firstTraversal), true);
strict_1.default.equal(Object.isFrozen(firstTraversal.traversal), true);
strict_1.default.equal(Object.isFrozen(firstTraversal.paths), true);
strict_1.default.deepEqual(firstTraversal.traversal.map((entry) => entry.nodeId), [
    "node-a",
    "node-b",
    "node-c",
    "node-a",
    "node-b",
    "node-c",
    "node-a",
    "node-b",
    "node-c"
]);
console.log("TASK-007 authority traversal convergence tests passed");
