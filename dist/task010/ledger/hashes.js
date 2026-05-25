"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canonicalize = canonicalize;
exports.deterministicHash = deterministicHash;
exports.hashEntry = hashEntry;
exports.hashLineage = hashLineage;
exports.hashSnapshot = hashSnapshot;
const node_crypto_1 = require("node:crypto");
function isJsonObject(value) {
    return (value !== null &&
        typeof value === "object" &&
        !Array.isArray(value));
}
function normalize(value) {
    if (value === null || typeof value !== "object") {
        return value;
    }
    if (Array.isArray(value)) {
        return value.map((entry) => normalize(entry));
    }
    if (!isJsonObject(value)) {
        return value;
    }
    const normalized = {};
    for (const key of Object.keys(value).sort()) {
        const normalizedValue = value[key];
        normalized[key] = normalize(normalizedValue);
    }
    return normalized;
}
function canonicalize(value) {
    return JSON.stringify(normalize(value));
}
function deterministicHash(value) {
    return (0, node_crypto_1.createHash)("sha256")
        .update(canonicalize(value))
        .digest("hex");
}
function hashEntry(entry) {
    return deterministicHash(entry);
}
function hashLineage(lineage) {
    return deterministicHash(lineage);
}
function hashSnapshot(snapshot) {
    return deterministicHash(snapshot);
}
