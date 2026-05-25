"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canonicalSerialize = canonicalSerialize;
exports.hashValue = hashValue;
const node_crypto_1 = require("node:crypto");
function canonicalize(value) {
    if (Array.isArray(value)) {
        return value.map(canonicalize);
    }
    if (value !== null && typeof value === "object") {
        return Object.keys(value)
            .sort()
            .reduce((result, key) => {
            result[key] = canonicalize(value[key]);
            return result;
        }, {});
    }
    return value;
}
function canonicalSerialize(value) {
    return JSON.stringify(canonicalize(value));
}
function hashValue(value) {
    return (0, node_crypto_1.createHash)("sha256")
        .update(canonicalSerialize(value))
        .digest("hex");
}
