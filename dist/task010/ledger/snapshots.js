"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSnapshot = createSnapshot;
exports.snapshotEquals = snapshotEquals;
const immutable_1 = require("./immutable");
const hashes_1 = require("./hashes");
function createSnapshot(lineage) {
    const snapshotHash = (0, hashes_1.deterministicHash)({
        lineageId: lineage.lineageId,
        lineageHash: lineage.lineageHash,
        entries: lineage.entries
    });
    const snapshotId = (0, hashes_1.deterministicHash)({
        snapshotHash
    });
    return (0, immutable_1.immutable)({
        snapshotId,
        lineageHash: lineage.lineageHash,
        snapshotHash
    });
}
function snapshotEquals(left, right) {
    return (left.snapshotHash === right.snapshotHash &&
        left.lineageHash === right.lineageHash);
}
