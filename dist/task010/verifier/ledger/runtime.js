"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildLineageFromEntries = buildLineageFromEntries;
exports.buildSnapshotsFromLineage = buildSnapshotsFromLineage;
exports.buildReplayChain = buildReplayChain;
exports.runFullDiagnostics = runFullDiagnostics;
exports.buildLedger = buildLedger;
exports.exportConstitutionalLedger = exportConstitutionalLedger;
const lineage_1 = require("../../ledger/lineage");
const snapshots_1 = require("../../ledger/snapshots");
const history_1 = require("../../ledger/history");
const export_1 = require("../../ledger/export");
const diagnostics_1 = require("../../ledger/diagnostics");
function buildLineageFromEntries(entries) {
    return (0, lineage_1.createLineage)(entries);
}
function buildSnapshotsFromLineage(lineage) {
    const snapshot = (0, snapshots_1.createSnapshot)(lineage);
    return [snapshot];
}
function buildReplayChain(lineage) {
    return [(0, history_1.createReplayCheckpoint)(lineage)];
}
function runFullDiagnostics(lineage, snapshots) {
    return {
        report: (0, diagnostics_1.generateLedgerReport)(lineage, snapshots),
        lineageValid: (0, diagnostics_1.validateLineageIntegrity)(lineage),
        replayValid: (0, diagnostics_1.validateReplayContinuity)(lineage, snapshots)
    };
}
function buildLedger(input) {
    const lineage = buildLineageFromEntries(input.entries);
    const snapshots = buildSnapshotsFromLineage(lineage);
    const checkpoints = buildReplayChain(lineage);
    return {
        lineage,
        snapshots,
        checkpoints
    };
}
function exportConstitutionalLedger(lineage, checkpoints) {
    return (0, export_1.exportLedger)(lineage, checkpoints);
}
