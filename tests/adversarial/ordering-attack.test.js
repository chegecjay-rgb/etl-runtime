const assert = require("assert");

function detectOrderingAmbiguity(graph) {
  const incoming = new Map();

  for (const node of graph.nodes) {
    incoming.set(node, 0);
  }

  for (const [, target] of graph.edges) {
    incoming.set(
      target,
      (incoming.get(target) ?? 0) + 1
    );
  }

  const available = graph.nodes.filter(
    node => (incoming.get(node) ?? 0) === 0
  );

  if (available.length > 1) {
    return {
      status: "REJECTED",
      reason: "ORDERING_AMBIGUITY"
    };
  }

  return null;
}

const result = detectOrderingAmbiguity({
  nodes: ["a", "b"],
  edges: []
});

assert.deepStrictEqual(
  result,
  {
    status: "REJECTED",
    reason: "ORDERING_AMBIGUITY"
  }
);

console.log("ordering attack deterministic test passed");
