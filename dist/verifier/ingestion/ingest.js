"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingestEvidence = ingestEvidence;
const admission_1 = require("../../ingestion/admission");
function ingestEvidence(evidence) {
    return (0, admission_1.admitEvidence)(evidence);
}
