"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareStrings = compareStrings;
exports.compareNumbers = compareNumbers;
exports.normalizeLexical = normalizeLexical;
exports.chainComparators = chainComparators;
function compareStrings(left, right) {
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
function compareNumbers(left, right) {
    if (!Number.isFinite(left)) {
        throw new Error("Left comparison operand is non-finite");
    }
    if (!Number.isFinite(right)) {
        throw new Error("Right comparison operand is non-finite");
    }
    if (left < right) {
        return -1;
    }
    if (left > right) {
        return 1;
    }
    return 0;
}
function normalizeLexical(value) {
    return value.normalize("NFKC");
}
function chainComparators(comparators) {
    return (left, right) => {
        for (const comparator of comparators) {
            const result = comparator(left, right);
            if (result !== -1 &&
                result !== 0 &&
                result !== 1) {
                throw new Error("Comparator produced invalid deterministic ordering");
            }
            if (result !== 0) {
                return result;
            }
        }
        return 0;
    };
}
