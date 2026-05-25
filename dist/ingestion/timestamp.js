"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeTimestamp = normalizeTimestamp;
const reject_1 = require("./reject");
const RFC3339_UTC = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
function normalizeTimestamp(value) {
    if (typeof value !== "string") {
        (0, reject_1.reject)(reject_1.RejectionCode.INVALID_TIMESTAMP, "timestamp must be string");
    }
    if (!RFC3339_UTC.test(value)) {
        (0, reject_1.reject)(reject_1.RejectionCode.INVALID_TIMESTAMP, "timestamp must be canonical RFC3339 UTC");
    }
    return value;
}
