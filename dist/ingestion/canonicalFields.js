"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stableSortedKeys = stableSortedKeys;
exports.ensurePlainObject = ensurePlainObject;
const reject_1 = require("./reject");
function stableSortedKeys(value) {
    return Object.freeze([...Object.keys(value)].sort());
}
function ensurePlainObject(value) {
    if (typeof value !== "object" ||
        value === null ||
        Array.isArray(value)) {
        (0, reject_1.reject)(reject_1.RejectionCode.INVALID_STRUCTURE, "expected canonical object structure");
    }
    return value;
}
