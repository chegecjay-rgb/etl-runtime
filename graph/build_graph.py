from typing import List, Dict

def node_id(n: Dict) -> str:
    return n["executionGroupId"] + ":" + n["systemId"]

VALID_EDGES = {
    "GOVERNOR": ["TIMELOCK"],
    "TIMELOCK": ["VAULT"]
}

def build_graph(normalized: List[Dict]) -> Dict:
    nodes = {}
    edges = []

    # Create nodes
    for n in normalized:
        nid = node_id(n)

        if nid not in nodes:
            nodes[nid] = {
                "id": nid,
                "executionGroupId": n["executionGroupId"],
                "systemId": n["systemId"],
                "executionClass": n["executionClass"]
            }

    # Create edges (STRICT CAUSAL RULES)
    for child in normalized:
        parent_group = child["causalParent"]

        if not parent_group:
            continue

        for parent in normalized:
            if (
                parent["executionGroupId"] == parent_group and
                parent["systemId"] in VALID_EDGES and
                child["systemId"] in VALID_EDGES[parent["systemId"]]
            ):
                edges.append({
                    "from": node_id(parent),
                    "to": node_id(child)
                })

    return {
        "nodes": list(nodes.values()),
        "edges": edges
    }

if __name__ == "__main__":
    normalized = [
        {
            "executionGroupId": "X",
            "systemId": "SAFE",
            "executionClass": "ATOMIC_EXECUTION",
            "causalParent": None
        },
        {
            "executionGroupId": "X",
            "systemId": "GOVERNOR",
            "executionClass": "BATCH_EXECUTION",
            "causalParent": None
        },
        {
            "executionGroupId": "X",
            "systemId": "TIMELOCK",
            "executionClass": "SCHEDULED_EXECUTION",
            "causalParent": "X"
        }
    ]

    graph = build_graph(normalized)

    print("NODES:")
    for n in graph["nodes"]:
        print(n)

    print("\nEDGES:")
    for e in graph["edges"]:
        print(e)
