"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.admitEvidence = admitEvidence;
const evidenceSet_1 = require("./evidenceSet");
const immutability_1 = require("./immutability");
const normalize_1 = require("./normalize");
const parser_1 = require("./parser");
function validateReplaySafety(parsed) {
    (0, immutability_1.assertDeepFrozen)(parsed);
    (0, immutability_1.assertDeepFrozen)(parsed.payload);
}
function admitEvidence(input) {
    const parsed = input.map((entry) => {
        const evidence = (0, parser_1.parseEvidence)(entry);
        validateReplaySafety(evidence);
        return evidence;
    });
    const canonical = parsed.map((entry) => (0, normalize_1.normalizeEvidence)(entry));
    const canonicalSet = (0, evidenceSet_1.buildCanonicalEvidenceSet)(canonical);
    (0, immutability_1.assertDeepFrozen)(canonicalSet);
    return Object.freeze({
        parsed: Object.freeze(parsed),
        canonicalSet,
    });
}
