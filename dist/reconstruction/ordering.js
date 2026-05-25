"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canonicalizeEvidence = canonicalizeEvidence;
const immutable_1 = require("./immutable");
function compareEvidence(left, right) {
    if (left.timestamp !== right.timestamp) {
        return left.timestamp.localeCompare(right.timestamp);
    }
    if (left.executionId !==
        right.executionId) {
        return left.executionId.localeCompare(right.executionId);
    }
    return left.evidenceHash.localeCompare(right.evidenceHash);
}
function canonicalizeEvidence(evidence) {
    return (0, immutable_1.deepFreeze)([...evidence].sort(compareEvidence));
}
