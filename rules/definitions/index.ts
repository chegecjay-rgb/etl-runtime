import { deepFreeze  } from "../immutable.js";
import type { VerificationRule } from "../types.js";

import { VRF_AUTH_001 } from "./vrf-auth-001.js";
import { VRF_GRAPH_001 } from "./vrf-graph-001.js";
import { VRF_GRAPH_002 } from "./vrf-graph-002.js";
import { VRF_ORDER_001 } from "./vrf-order-001.js";
import { VRF_ORDER_002 } from "./vrf-order-002.js";
import { VRF_DECL_001 } from "./vrf-decl-001.js";

export const CONSTITUTIONAL_RULES: ReadonlyArray<VerificationRule> = deepFreeze([
  VRF_AUTH_001,
  VRF_DECL_001,
  VRF_GRAPH_001,
  VRF_GRAPH_002,
  VRF_ORDER_001,
  VRF_ORDER_002,
]);

export {
  VRF_AUTH_001,
  VRF_DECL_001,
  VRF_GRAPH_001,
  VRF_GRAPH_002,
  VRF_ORDER_001,
  VRF_ORDER_002,
};
