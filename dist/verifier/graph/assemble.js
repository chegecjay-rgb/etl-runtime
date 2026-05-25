"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assembleGraph = assembleGraph;
const project_1 = require("./project");
const validate_1 = require("./validate");
function assembleGraph(records) {
    const graph = (0, project_1.projectRecords)(records);
    const certification = (0, validate_1.validateGraph)(graph);
    return Object.freeze({
        graph,
        certification
    });
}
