"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONSISTENCY_STATES = void 0;
exports.isConsistencyState = isConsistencyState;
exports.assertConsistencyState = assertConsistencyState;
exports.CONSISTENCY_STATES = [
    "VALID",
    "INVALID",
    "INCONSISTENT",
    "UNKNOWN"
];
function isConsistencyState(value) {
    return (typeof value === "string" &&
        exports.CONSISTENCY_STATES.includes(value));
}
function assertConsistencyState(value) {
    if (!isConsistencyState(value)) {
        throw new Error(`Invalid consistency state: ${String(value)}`);
    }
    return value;
}
