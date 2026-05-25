"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareProjections = compareProjections;
function compareProjections(left, right) {
    return Object.freeze({
        equivalent: left.projectionHash ===
            right.projectionHash,
        leftHash: left.projectionHash,
        rightHash: right.projectionHash,
    });
}
