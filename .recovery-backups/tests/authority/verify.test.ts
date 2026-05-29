test("constitutional certification", () => {
import assert from "node:assert/strict";

import {
  verifyAuthorityPipeline
} from "../../verifier/authority/verify.js";

const result =
  verifyAuthorityPipeline(
    [
      {
        nodeId: "node-a",
        authority: {
          authorityId:
            "executor.alpha",
          capabilities: [
            "deploy"
          ],
          delegations: [
            "delegate.alpha"
          ],
          controlSurfaces: [
            "governance"
          ]
        }
      },
      {
        nodeId: "node-b",
        authority: {
          authorityId:
            "executor.beta",
          capabilities: [
            "mint"
          ],
          delegations: [
            "delegate.beta"
          ],
          controlSurfaces: [
            "operations"
          ]
        }
      }
    ],
    [
      {
        fromNodeId: "node-a",
        toNodeId: "node-b"
      }
    ]
  );

assert.deepStrictEqual(
  result.pipeline,
  {
    declarations: 2,
    edges: 1,
    traversalNodes: 3
  }
);

assert.equal(
  result.bundle.continuity.states.length,
  3
);

assert.equal(
  result.bundle.undeclared
    .undeclared.length,
  0
);

assert.equal(
  result.bundle.certification
    .equivalence.equivalent,
  true
);

assert.equal(
  result.bundle.hashes
    .continuity.algorithm,
  "sha256"
);

assert.equal(
  result.bundle.hashes
    .continuity.value.length,
  64
);

assert.equal(
  Object.isFrozen(result),
  true
);

assert.equal(
  Object.isFrozen(
    result.bundle
  ),
  true
);

assert.equal(
  Object.isFrozen(
    result.pipeline
  ),
  true
);

console.log(
  "TASK-007 authority verifier integration tests passed"
);
})
