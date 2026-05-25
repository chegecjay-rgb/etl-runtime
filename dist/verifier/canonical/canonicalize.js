"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canonicalize = void 0;
const isCanonicalObject = (value) => {
    return (value !== null &&
        typeof value === "object" &&
        !Array.isArray(value));
};
const canonicalize = (value) => {
    if (value === null ||
        typeof value !== "object") {
        return value;
    }
    if (Array.isArray(value)) {
        return value.map(exports.canonicalize);
    }
    if (!isCanonicalObject(value)) {
        throw new Error("Invalid canonical object");
    }
    const orderedKeys = Object.keys(value).sort();
    const result = {};
    for (const key of orderedKeys) {
        result[key] = (0, exports.canonicalize)(value[key]);
    }
    return Object.freeze(result);
};
exports.canonicalize = canonicalize;
