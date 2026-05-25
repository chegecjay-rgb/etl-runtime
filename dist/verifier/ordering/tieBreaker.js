"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeLexical = normalizeLexical;
exports.lexicalTieBreak = lexicalTieBreak;
exports.deterministicTieBreak = deterministicTieBreak;
function normalizeLexical(value) {
    return value.normalize("NFKC");
}
function lexicalTieBreak(left, right) {
    const normalizedLeft = normalizeLexical(left);
    const normalizedRight = normalizeLexical(right);
    if (normalizedLeft < normalizedRight) {
        return -1;
    }
    if (normalizedLeft > normalizedRight) {
        return 1;
    }
    return 0;
}
function deterministicTieBreak(primary, leftId, rightId) {
    if (primary !== -1 &&
        primary !== 0 &&
        primary !== 1) {
        throw new Error("Invalid deterministic ordering");
    }
    if (primary !== 0) {
        return primary;
    }
    return lexicalTieBreak(leftId, rightId);
}
