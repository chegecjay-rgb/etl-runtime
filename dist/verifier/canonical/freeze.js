"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepFreeze = void 0;
const isObject = (value) => {
    return (value !== null &&
        typeof value === "object");
};
const deepFreezeInternal = (value, seen = new WeakSet()) => {
    if (!isObject(value)) {
        return value;
    }
    if (seen.has(value)) {
        return value;
    }
    seen.add(value);
    if (Array.isArray(value)) {
        for (const item of value) {
            deepFreezeInternal(item, seen);
        }
        return Object.freeze(value);
    }
    for (const key of Object.keys(value)) {
        const nested = value[key];
        deepFreezeInternal(nested, seen);
    }
    return Object.freeze(value);
};
const deepFreeze = (value) => {
    return deepFreezeInternal(value);
};
exports.deepFreeze = deepFreeze;
