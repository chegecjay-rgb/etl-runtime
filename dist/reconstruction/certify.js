"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.certifyReplayEquivalence = certifyReplayEquivalence;
const ordering_1 = require("./ordering");
const lineage_1 = require("./lineage");
const projection_1 = require("./projection");
const diagnostics_1 = require("./diagnostics");
function certifyReplayEquivalence(baseline, replay) {
    const baselineProjection = (0, projection_1.createExecutionProjection)((0, lineage_1.reconstructLineage)((0, ordering_1.canonicalizeEvidence)(baseline)));
    const replayProjection = (0, projection_1.createExecutionProjection)((0, lineage_1.reconstructLineage)((0, ordering_1.canonicalizeEvidence)(replay)));
    const comparison = (0, diagnostics_1.compareProjections)(baselineProjection, replayProjection);
    return Object.freeze({
        equivalent: comparison.equivalent,
        baselineHash: comparison.leftHash,
        replayHash: comparison.rightHash,
    });
}
