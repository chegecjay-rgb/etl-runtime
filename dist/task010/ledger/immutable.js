"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepFreeze = deepFreeze;
exports.immutable = immutable;
function deepFreeze(value) {
    if (value === null || typeof value !== "object") {
        return value;
    }
    if (Object.isFrozen(value)) {
        return value;
    }
    const target = value;
    for (const key of Object.keys(target)) {
        const child = target[key];
        if (child && typeof child === "object") {
            deepFreeze(child);
        }
    }
    return Object.freeze(value);
}
function immutable(value) {
    return deepFreeze(structuredClone(value));
}
