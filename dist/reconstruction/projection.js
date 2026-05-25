"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjectionHash = createProjectionHash;
exports.createExecutionProjection = createExecutionProjection;
const node_crypto_1 = require("node:crypto");
function stableSerialize(value) {
    if (value === null ||
        typeof value !== "object") {
        return JSON.stringify(value);
    }
    if (Array.isArray(value)) {
        return `[${value
            .map((entry) => stableSerialize(entry))
            .join(",")}]`;
    }
    const entries = Object.entries(value).sort(([left], [right]) => left.localeCompare(right));
    return `{${entries
        .map(([key, entry]) => `${JSON.stringify(key)}:${stableSerialize(entry)}`)
        .join(",")}}`;
}
function createProjectionHash(nodes) {
    const serialized = stableSerialize(nodes);
    return (0, node_crypto_1.createHash)("sha256")
        .update(serialized)
        .digest("hex");
}
function createExecutionProjection(nodes) {
    const canonicalOrdering = nodes.map((node) => node.executionId);
    const roots = nodes
        .filter((node) => node.continuityState === "root")
        .map((node) => node.executionId);
    const unresolved = nodes
        .filter((node) => node.continuityState ===
        "unknown-parent")
        .map((node) => node.executionId);
    return Object.freeze({
        projectionHash: createProjectionHash(nodes),
        nodes: Object.freeze([...nodes]),
        roots: Object.freeze(roots),
        unresolved: Object.freeze(unresolved),
        canonicalOrdering: Object.freeze(canonicalOrdering),
    });
}
