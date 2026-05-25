"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertDeepFrozen = assertDeepFrozen;
const reject_1 = require("./reject");
function assertDeepFrozen(value) {
    if (typeof value !== "object" ||
        value === null) {
        return;
    }
    if (Object.isFrozen(value) !== true) {
        (0, reject_1.reject)(reject_1.RejectionCode.MUTATION_DETECTED, "mutable structure detected");
    }
    if (Array.isArray(value)) {
        for (const entry of value) {
            assertDeepFrozen(entry);
        }
        return;
    }
    for (const key of Object.keys(value)) {
        assertDeepFrozen(value[key]);
    }
}
