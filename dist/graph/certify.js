"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.certifyGraph = certifyGraph;
const crypto_1 = __importDefault(require("crypto"));
const normalize_1 = require("./normalize");
const causality_1 = require("./causality");
const orphans_1 = require("./orphans");
const authority_1 = require("./authority");
function certifyGraph(input) {
    const graph = (0, normalize_1.normalizeGraph)(input);
    const snapshot = JSON.stringify(graph);
    crypto_1.default
        .createHash("sha256")
        .update(snapshot)
        .digest("hex");
    return Object.freeze({
        causality: (0, causality_1.validateCausality)(graph),
        orphans: (0, orphans_1.validateOrphans)(graph),
        authority: (0, authority_1.validateAuthority)(graph)
    });
}
