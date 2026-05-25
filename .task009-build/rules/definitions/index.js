"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VRF_ORDER_002 = exports.VRF_ORDER_001 = exports.VRF_GRAPH_002 = exports.VRF_GRAPH_001 = exports.VRF_DECL_001 = exports.VRF_AUTH_001 = exports.CONSTITUTIONAL_RULES = void 0;
const immutable_1 = require("../immutable");
const vrf_auth_001_1 = require("./vrf-auth-001");
Object.defineProperty(exports, "VRF_AUTH_001", { enumerable: true, get: function () { return vrf_auth_001_1.VRF_AUTH_001; } });
const vrf_graph_001_1 = require("./vrf-graph-001");
Object.defineProperty(exports, "VRF_GRAPH_001", { enumerable: true, get: function () { return vrf_graph_001_1.VRF_GRAPH_001; } });
const vrf_graph_002_1 = require("./vrf-graph-002");
Object.defineProperty(exports, "VRF_GRAPH_002", { enumerable: true, get: function () { return vrf_graph_002_1.VRF_GRAPH_002; } });
const vrf_order_001_1 = require("./vrf-order-001");
Object.defineProperty(exports, "VRF_ORDER_001", { enumerable: true, get: function () { return vrf_order_001_1.VRF_ORDER_001; } });
const vrf_order_002_1 = require("./vrf-order-002");
Object.defineProperty(exports, "VRF_ORDER_002", { enumerable: true, get: function () { return vrf_order_002_1.VRF_ORDER_002; } });
const vrf_decl_001_1 = require("./vrf-decl-001");
Object.defineProperty(exports, "VRF_DECL_001", { enumerable: true, get: function () { return vrf_decl_001_1.VRF_DECL_001; } });
exports.CONSTITUTIONAL_RULES = (0, immutable_1.deepFreeze)([
    vrf_auth_001_1.VRF_AUTH_001,
    vrf_decl_001_1.VRF_DECL_001,
    vrf_graph_001_1.VRF_GRAPH_001,
    vrf_graph_002_1.VRF_GRAPH_002,
    vrf_order_001_1.VRF_ORDER_001,
    vrf_order_002_1.VRF_ORDER_002,
]);
