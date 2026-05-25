"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReplayCheckpoint = createReplayCheckpoint;
exports.validateReplayEquivalence = validateReplayEquivalence;
exports.certifyReplayHistory = certifyReplayHistory;
const immutable_1 = require("./immutable");
const hashes_1 = require("./hashes");
const snapshots_1 = require("./snapshots");
function createReplayCheckpoint(lineage) {
    const snapshot = (0, snapshots_1.createSnapshot)(lineage);
    const replayHash = (0, hashes_1.deterministicHash)({
        lineageHash: lineage.lineageHash,
        snapshotHash: snapshot.snapshotHash
    });
    const checkpointId = (0, hashes_1.deterministicHash)({
        replayHash
    });
    return (0, immutable_1.immutable)({
        checkpointId,
        snapshot,
        replayHash
    });
}
function validateReplayEquivalence(left, right) {
    return (left.replayHash === right.replayHash &&
        left.snapshot.snapshotHash === right.snapshot.snapshotHash &&
        left.snapshot.lineageHash === right.snapshot.lineageHash);
}
function certifyReplayHistory(checkpoints) {
    return (0, hashes_1.deterministicHash)({
        checkpoints
    });
}
