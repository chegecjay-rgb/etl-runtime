"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildReplayDiagnostic = buildReplayDiagnostic;
const node_crypto_1 = require("node:crypto");
function sha256(value) {
    return (0, node_crypto_1.createHash)("sha256")
        .update(value)
        .digest("hex");
}
function buildReplayDiagnostic(canonicalDigest, orderingDigest, evidenceCount) {
    return Object.freeze({
        canonicalDigest: sha256(canonicalDigest),
        orderingDigest: sha256(orderingDigest),
        evidenceCount,
    });
}
