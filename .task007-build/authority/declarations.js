"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveAuthorityDeclarations = resolveAuthorityDeclarations;
exports.createDeclarationIndex = createDeclarationIndex;
exports.projectDeclarationIndex = projectDeclarationIndex;
exports.lookupAuthorityDeclaration = lookupAuthorityDeclaration;
const immutable_1 = require("./immutable");
const normalize_1 = require("./normalize");
function sortDeclarations(declarations) {
    return Object.freeze([...declarations].sort((left, right) => {
        const nodeOrder = left.nodeId.localeCompare(right.nodeId);
        if (nodeOrder !== 0) {
            return nodeOrder;
        }
        return left.authority.authorityId.localeCompare(right.authority.authorityId);
    }));
}
function resolveAuthorityDeclarations(declarations) {
    return Object.freeze(sortDeclarations(declarations).map((declaration) => (0, immutable_1.deepFreeze)({
        nodeId: declaration.nodeId.trim(),
        authority: (0, normalize_1.normalizeAuthorityDescriptor)(declaration.authority)
    })));
}
function createDeclarationIndex(declarations) {
    const entries = resolveAuthorityDeclarations(declarations).map((resolved) => [resolved.nodeId, resolved]);
    return (0, immutable_1.deepFreeze)(new Map(entries));
}
function projectDeclarationIndex(index) {
    return Object.freeze([...index.values()]
        .map((resolved) => (0, immutable_1.deepFreeze)({
        nodeId: resolved.nodeId,
        authorityId: resolved.authority.authorityId
    }))
        .sort((left, right) => left.nodeId.localeCompare(right.nodeId)));
}
function lookupAuthorityDeclaration(index, nodeId) {
    return index.get(nodeId.trim());
}
