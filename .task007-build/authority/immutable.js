"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepFreeze = deepFreeze;
function deepFreeze(value) {
    if (value && typeof value === "object" && !Object.isFrozen(value)) {
        Object.freeze(value);
        for (const key of Reflect.ownKeys(value)) {
            const nested = value[key];
            if (nested && typeof nested === "object") {
                deepFreeze(nested);
            }
        }
    }
    return value;
}
