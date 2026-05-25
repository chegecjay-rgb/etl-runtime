"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCanonicalValue = validateCanonicalValue;
const reject_1 = require("./reject");
function validatePrimitive(value) {
    if (typeof value === "function" ||
        typeof value === "symbol" ||
        typeof value === "bigint" ||
        typeof value === "undefined") {
        (0, reject_1.reject)(reject_1.RejectionCode.NON_CANONICAL_FIELD, "unsupported primitive type");
    }
    if (typeof value === "number" &&
        Number.isFinite(value) === false) {
        (0, reject_1.reject)(reject_1.RejectionCode.NON_CANONICAL_FIELD, "non-finite number rejected");
    }
}
function validateCanonicalValue(value) {
    validatePrimitive(value);
    if (Array.isArray(value)) {
        for (const entry of value) {
            validateCanonicalValue(entry);
        }
        return;
    }
    if (typeof value === "object" &&
        value !== null) {
        const record = value;
        for (const key of Object.keys(record)) {
            validateCanonicalValue(record[key]);
        }
    }
}
