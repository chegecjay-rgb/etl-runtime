"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepFreeze = deepFreeze;
function deepFreeze(value) {
    if (typeof value !== "object" || value === null) {
        return value;
    }
    Object.freeze(value);
    for (const key of Reflect.ownKeys(value)) {
        const child = value[key];
        if (typeof child === "object" && child !== null) {
            deepFreeze(child);
        }
    }
    return value;
}
