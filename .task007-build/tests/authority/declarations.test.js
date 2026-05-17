"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const declarations_1 = require("../../authority/declarations");
const declarations = [
    {
        nodeId: "node-b",
        authority: {
            authorityId: "executor.beta",
            capabilities: ["mint", "deploy"],
            delegations: ["delegate.gamma"],
            controlSurfaces: ["treasury"]
        }
    },
    {
        nodeId: "node-a",
        authority: {
            authorityId: " executor.alpha ",
            capabilities: ["audit", "deploy", "audit"],
            delegations: ["delegate.alpha"],
            controlSurfaces: [" governance "]
        }
    }
];
const resolved = (0, declarations_1.resolveAuthorityDeclarations)(declarations);
strict_1.default.equal(resolved[0]?.nodeId, "node-a");
strict_1.default.equal(resolved[0]?.authority.authorityId, "executor.alpha");
const index = (0, declarations_1.createDeclarationIndex)(declarations);
const lookup = (0, declarations_1.lookupAuthorityDeclaration)(index, " node-a ");
strict_1.default.ok(lookup);
strict_1.default.equal(lookup?.authority.authorityId, "executor.alpha");
const projection = (0, declarations_1.projectDeclarationIndex)(index);
strict_1.default.deepEqual(projection, [
    {
        nodeId: "node-a",
        authorityId: "executor.alpha"
    },
    {
        nodeId: "node-b",
        authorityId: "executor.beta"
    }
]);
strict_1.default.equal(Object.isFrozen(projection), true);
console.log("TASK-007 authority declaration tests passed");
