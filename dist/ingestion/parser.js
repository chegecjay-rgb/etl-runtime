"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEvidence = parseEvidence;
const canonicalFields_1 = require("./canonicalFields");
const reject_1 = require("./reject");
const timestamp_1 = require("./timestamp");
const validators_1 = require("./validators");
const SUPPORTED_KINDS = Object.freeze([
    "ERC8241_DISCLOSURE",
    "PROOF_OF_OPERATION",
    "ETNL_OUTPUT",
    "GRAPH_REFERENCE",
]);
function deepFreeze(value) {
    if (typeof value === "object" &&
        value !== null) {
        Object.freeze(value);
        for (const key of Object.keys(value)) {
            deepFreeze(value[key]);
        }
    }
    return value;
}
function parseEvidence(input) {
    const candidate = (0, canonicalFields_1.ensurePlainObject)(input);
    const requiredFields = [
        "id",
        "kind",
        "payload",
        "timestamp",
    ];
    const keys = (0, canonicalFields_1.stableSortedKeys)(candidate);
    if (JSON.stringify(keys) !==
        JSON.stringify(requiredFields)) {
        (0, reject_1.reject)(reject_1.RejectionCode.INVALID_STRUCTURE, "non-canonical evidence fields");
    }
    const { id, kind, payload, timestamp, } = candidate;
    if (typeof id !== "string" ||
        id.length === 0) {
        (0, reject_1.reject)(reject_1.RejectionCode.INVALID_STRUCTURE, "invalid evidence id");
    }
    if (typeof kind !== "string" ||
        !SUPPORTED_KINDS.includes(kind)) {
        (0, reject_1.reject)(reject_1.RejectionCode.UNSUPPORTED_KIND, "unsupported evidence kind");
    }
    const normalizedTimestamp = (0, timestamp_1.normalizeTimestamp)(timestamp);
    const normalizedPayload = (0, canonicalFields_1.ensurePlainObject)(payload);
    (0, validators_1.validateCanonicalValue)(normalizedPayload);
    return deepFreeze({
        kind,
        id,
        timestamp: normalizedTimestamp,
        payload: normalizedPayload,
    });
}
