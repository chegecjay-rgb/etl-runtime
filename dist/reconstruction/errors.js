"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReconstructionError = void 0;
class ReconstructionError extends Error {
    code;
    constructor(code, message) {
        super(message);
        this.name = "ReconstructionError";
        this.code = code;
    }
}
exports.ReconstructionError = ReconstructionError;
