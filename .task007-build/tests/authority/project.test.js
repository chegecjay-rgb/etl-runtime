"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const declarations_1 = require("../../authority/declarations");
const project_1 = require("../../authority/project");
const declarationIndex = (0, declarations_1.createDeclarationIndex)([
    {
        nodeId: "node-b",
        authority: {
            authorityId: "executor.beta",
            capabilities: ["mint"],
            delegations: ["delegate.gamma"],
            controlSurfaces: ["treasury"]
        }
    },
    {
        nodeId: "node-a",
        authority: {
            authorityId: "executor.alpha",
            capabilities: ["deploy"],
            delegations: ["delegate.alpha"],
            controlSurfaces: ["governance"]
        }
    }
]);
const graph = (0, project_1.createAuthorityProjectionGraph)(declarationIndex, [
    {
        fromNodeId: "node-b",
        toNodeId: "node-a"
    },
    {
        fromNodeId: "node-a",
        toNodeId: "node-b"
    }
]);
strict_1.default.deepEqual(graph.nodes, [
    {
        nodeId: "node-a",
        authorityId: "executor.alpha"
    },
    {
        nodeId: "node-b",
        authorityId: "executor.beta"
    }
]);
strict_1.default.deepEqual(graph.edges, [
    {
        fromNodeId: "node-a",
        toNodeId: "node-b"
    },
    {
        fromNodeId: "node-b",
        toNodeId: "node-a"
    }
]);
const paths = (0, project_1.projectAuthorityPaths)(graph);
strict_1.default.deepEqual(paths, [
    {
        authorityId: "executor.alpha",
        nodePath: ["node-a"]
    },
    {
        authorityId: "executor.beta",
        nodePath: ["node-b"]
    }
]);
strict_1.default.equal(Object.isFrozen(graph), true);
strict_1.default.equal(Object.isFrozen(graph.nodes), true);
strict_1.default.equal(Object.isFrozen(graph.edges), true);
console.log("TASK-007 authority projection tests passed");
