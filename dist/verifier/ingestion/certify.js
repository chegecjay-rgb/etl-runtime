"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.certifyReplay = certifyReplay;
const admission_1 = require("../../ingestion/admission");
const diagnostics_1 = require("../../ingestion/diagnostics");
function certifyReplay(evidence) {
    const admitted = (0, admission_1.admitEvidence)(evidence);
    return (0, diagnostics_1.buildReplayDiagnostic)(admitted.canonicalSet
        .canonicalSetDigest, admitted.canonicalSet
        .orderingDigest, admitted.canonicalSet
        .evidence.length);
}
