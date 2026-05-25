"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepFreeze = deepFreeze;
function deepFreeze(value) {
    if (value === null || typeof value !== "object") {
        return value;
    }
    if (Object.isFrozen(value)) {
        return value;
    }
    const target = value;
    for (const key of Object.keys(target)) {
        const nested = target[key];
        if (nested !== null && typeof nested === "object") {
            deepFreeze(nested);
        }
    }
    return Object.freeze(value);
}
