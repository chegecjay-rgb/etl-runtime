"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthorityHashes = createAuthorityHashes;
const node_crypto_1 = require("node:crypto");
const immutable_1 = require("./immutable");
function stableHash(value) {
    const hash = (0, node_crypto_1.createHash)("sha256");
    hash.update(value.join("\n"), "utf8");
    return (0, immutable_1.deepFreeze)({
        algorithm: "sha256",
        value: hash.digest("hex")
    });
}
function normalizeContinuity(continuity) {
    return Object.freeze(continuity.continuity
        .map((entry) => `${entry.authorityId}:${entry.state}:${entry.lineage.join(">")}`)
        .sort((left, right) => left.localeCompare(right)));
}
function normalizeTraversal(traversal) {
    return Object.freeze(traversal.traversal
        .map((entry) => `${entry.nodeId}:${entry.authorityId}:${entry.depth}`)
        .sort((left, right) => left.localeCompare(right)));
}
function normalizeCertification(snapshot) {
    return Object.freeze([
        ...snapshot.continuityStates,
        ...snapshot.traversalAuthorities,
        ...snapshot.undeclaredAuthorities
    ].sort((left, right) => left.localeCompare(right)));
}
function createAuthorityHashes(continuity, traversal, snapshot) {
    return (0, immutable_1.deepFreeze)({
        continuity: stableHash(normalizeContinuity(continuity)),
        traversal: (0, immutable_1.deepFreeze)({
            traversal: stableHash(normalizeTraversal(traversal))
        }),
        certification: (0, immutable_1.deepFreeze)({
            certification: stableHash(normalizeCertification(snapshot))
        })
    });
}
