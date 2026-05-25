"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLedgerReport = generateLedgerReport;
exports.validateLineageIntegrity = validateLineageIntegrity;
exports.validateSnapshotConsistency = validateSnapshotConsistency;
exports.validateReplayContinuity = validateReplayContinuity;
exports.detectMutationAnomalies = detectMutationAnomalies;
const traversal_1 = require("./traversal");
const immutable_1 = require("./immutable");
function generateLedgerReport(lineage, snapshots) {
    const entries = (0, traversal_1.traverseLineage)(lineage);
    return (0, immutable_1.immutable)({
        entryCount: entries.length,
        snapshotCount: snapshots.length,
        lineageId: lineage.lineageId,
        entryIds: entries.map(e => e.entryId),
        snapshotHashes: snapshots.map(s => s.snapshotHash),
        isEmpty: entries.length === 0
    });
}
function validateLineageIntegrity(lineage) {
    const entries = (0, traversal_1.traverseLineage)(lineage);
    const ids = entries.map(e => e.entryId);
    const unique = new Set(ids);
    return ids.length === unique.size;
}
function validateSnapshotConsistency(snapshots) {
    const hashes = snapshots.map(s => s.snapshotHash);
    const unique = new Set(hashes);
    return hashes.length === unique.size;
}
function validateReplayContinuity(lineage, snapshots) {
    return validateLineageIntegrity(lineage) && validateSnapshotConsistency(snapshots);
}
function detectMutationAnomalies(lineage) {
    try {
        const entries = (0, traversal_1.traverseLineage)(lineage);
        Object.freeze(entries);
        return Object.isFrozen(entries);
    }
    catch {
        return false;
    }
}
