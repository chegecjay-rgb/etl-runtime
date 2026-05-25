"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportLedger = exportLedger;
exports.exportEquals = exportEquals;
const immutable_1 = require("./immutable");
const hashes_1 = require("./hashes");
const traversal_1 = require("./traversal");
function collectSnapshots(checkpoints) {
    return (0, immutable_1.immutable)(checkpoints.map((checkpoint) => checkpoint.snapshot));
}
function exportLedger(lineage, checkpoints) {
    const entries = (0, traversal_1.traverseLineage)(lineage);
    const snapshots = collectSnapshots(checkpoints);
    const exportHash = (0, hashes_1.deterministicHash)({
        lineageHash: lineage.lineageHash,
        checkpoints,
        snapshots,
        entries
    });
    return (0, immutable_1.immutable)({
        exportHash,
        lineage,
        checkpoints: (0, immutable_1.immutable)([...checkpoints]),
        snapshots,
        entries
    });
}
function exportEquals(left, right) {
    return (left.exportHash === right.exportHash);
}
