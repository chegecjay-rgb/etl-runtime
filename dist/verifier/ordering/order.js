"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canonicalEvidenceComparator = canonicalEvidenceComparator;
exports.stableCanonicalSort = stableCanonicalSort;
exports.canonicalizeEvidence = canonicalizeEvidence;
function canonicalEvidenceComparator(left, right) {
    if (left.timestamp < right.timestamp)
        return -1;
    if (left.timestamp > right.timestamp)
        return 1;
    if (left.authority < right.authority)
        return -1;
    if (left.authority > right.authority)
        return 1;
    if (left.type < right.type)
        return -1;
    if (left.type > right.type)
        return 1;
    if (left.hash < right.hash)
        return -1;
    if (left.hash > right.hash)
        return 1;
    if (left.id < right.id)
        return -1;
    if (left.id > right.id)
        return 1;
    return 0;
}
function stableCanonicalSort(values, comparator) {
    const cloned = [...values];
    cloned.sort((left, right) => {
        const result = comparator(left, right);
        if (result !== -1 &&
            result !== 0 &&
            result !== 1) {
            throw new Error("Comparator produced invalid deterministic ordering");
        }
        return result;
    });
    return cloned;
}
function canonicalizeEvidence(evidence) {
    return stableCanonicalSort(evidence, canonicalEvidenceComparator);
}
