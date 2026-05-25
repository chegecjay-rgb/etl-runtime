"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeCanonical = exports.DeterministicSerializer = void 0;
const canonicalize_1 = require("./canonicalize");
const assertSerializable = (value, seen = new WeakSet()) => {
    if (value === undefined) {
        throw new Error("Undefined values are forbidden");
    }
    if (typeof value === "function" ||
        typeof value === "symbol" ||
        typeof value === "bigint") {
        throw new Error("Unsupported canonical type");
    }
    if (value !== null &&
        typeof value === "object") {
        if (seen.has(value)) {
            throw new Error("Cyclic structures are forbidden");
        }
        seen.add(value);
        if (Array.isArray(value)) {
            for (const item of value) {
                assertSerializable(item, seen);
            }
            return;
        }
        const prototype = Object.getPrototypeOf(value);
        if (prototype !== Object.prototype) {
            throw new Error("Prototype-bearing objects are forbidden");
        }
        for (const nested of Object.values(value)) {
            assertSerializable(nested, seen);
        }
    }
};
class DeterministicSerializer {
    serialize(value) {
        assertSerializable(value);
        const canonical = (0, canonicalize_1.canonicalize)(value);
        return JSON.stringify(canonical);
    }
}
exports.DeterministicSerializer = DeterministicSerializer;
const serializeCanonical = (value) => {
    return new DeterministicSerializer()
        .serialize(value);
};
exports.serializeCanonical = serializeCanonical;
