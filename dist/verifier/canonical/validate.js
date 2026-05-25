"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEvidence = exports.CanonicalEvidenceValidator = void 0;
const createViolation = (path, reason) => {
    return Object.freeze({
        path,
        reason
    });
};
const isPlainObject = (value) => {
    if (value === null ||
        typeof value !== "object") {
        return false;
    }
    return (Object.getPrototypeOf(value) ===
        Object.prototype);
};
const validateCanonicalValue = (value, path, violations, seen = new WeakSet()) => {
    if (value === null ||
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean") {
        return true;
    }
    if (typeof value === "undefined" ||
        typeof value === "function" ||
        typeof value === "symbol" ||
        typeof value === "bigint") {
        violations.push(createViolation(path, "Unsupported canonical type"));
        return false;
    }
    if (Array.isArray(value)) {
        if (seen.has(value)) {
            violations.push(createViolation(path, "Cyclic structure detected"));
            return false;
        }
        seen.add(value);
        let valid = true;
        for (let i = 0; i < value.length; i += 1) {
            const nestedValid = validateCanonicalValue(value[i], path + "[" + i + "]", violations, seen);
            if (!nestedValid) {
                valid = false;
            }
        }
        return valid;
    }
    if (!isPlainObject(value)) {
        violations.push(createViolation(path, "Prototype-bearing objects are forbidden"));
        return false;
    }
    if (seen.has(value)) {
        violations.push(createViolation(path, "Cyclic structure detected"));
        return false;
    }
    seen.add(value);
    let valid = true;
    for (const key of Object.keys(value)) {
        const nestedValid = validateCanonicalValue(value[key], path + "." + key, violations, seen);
        if (!nestedValid) {
            valid = false;
        }
    }
    return valid;
};
const isCanonicalEvidence = (value) => {
    if (!isPlainObject(value)) {
        return false;
    }
    return (typeof value.schemaVersion ===
        "string" &&
        typeof value.kind ===
            "string" &&
        typeof value.identifier ===
            "object" &&
        value.identifier !== null &&
        typeof value.payload ===
            "object" &&
        value.payload !== null);
};
class CanonicalEvidenceValidator {
    validate(value) {
        const violations = [];
        if (!isCanonicalEvidence(value)) {
            violations.push(createViolation("$", "Invalid canonical evidence structure"));
            return Object.freeze({
                valid: false,
                violations
            });
        }
        validateCanonicalValue(value.payload, "$.payload", violations);
        return Object.freeze({
            valid: violations.length === 0,
            violations: Object.freeze(violations)
        });
    }
}
exports.CanonicalEvidenceValidator = CanonicalEvidenceValidator;
const validateEvidence = (value) => {
    return new CanonicalEvidenceValidator()
        .validate(value);
};
exports.validateEvidence = validateEvidence;
