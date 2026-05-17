"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const normalize_1 = require("../../authority/normalize");
const descriptor = (0, normalize_1.normalizeAuthorityDescriptor)({
    authorityId: " executor.alpha ",
    capabilities: [
        "deploy",
        "mint",
        "deploy",
        " audit "
    ],
    delegations: [
        "delegate.beta",
        "delegate.alpha",
        "delegate.beta"
    ],
    controlSurfaces: [
        "governance",
        " treasury ",
        "governance"
    ]
});
strict_1.default.equal(descriptor.authorityId, "executor.alpha");
strict_1.default.deepEqual(descriptor.capabilities, (0, normalize_1.normalizeCapabilities)([
    "mint",
    "deploy",
    "audit",
    "deploy"
]));
strict_1.default.deepEqual(descriptor.delegations, (0, normalize_1.normalizeDelegations)([
    "delegate.beta",
    "delegate.alpha"
]));
strict_1.default.deepEqual(descriptor.controlSurfaces, (0, normalize_1.normalizeControlSurfaces)([
    "treasury",
    "governance"
]));
strict_1.default.equal(Object.isFrozen(descriptor), true);
strict_1.default.equal(Object.isFrozen(descriptor.capabilities), true);
console.log("TASK-007 authority normalization tests passed");
