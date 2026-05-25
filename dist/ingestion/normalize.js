"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeEvidence = normalizeEvidence;
function deepSort(value) {
    if (Array.isArray(value)) {
        return Object.freeze(value.map((entry) => deepSort(entry)));
    }
    if (typeof value === "object" && value !== null) {
        const record = value;
        const sortedEntries = Object.keys(record)
            .sort()
            .map((key) => [key, deepSort(record[key])]);
        return Object.freeze(Object.fromEntries(sortedEntries));
    }
    return value;
}
function normalizeEvidence(evidence) {
    return Object.freeze({
        kind: evidence.kind,
        id: evidence.id,
        timestamp: evidence.timestamp,
        payload: deepSort(evidence.payload),
    });
}
