"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGraph = validateGraph;
const certify_1 = require("../../graph/certify");
function validateGraph(graph) {
    return (0, certify_1.certifyGraph)(graph);
}
