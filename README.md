# ETL Runtime Layer

## Overview
Execution Trace Normalization (ETNL) + Graph Construction Layer

This repository provides a deterministic runtime layer that transforms raw Proof-of-Operation (PoO) events into a unified execution graph across heterogeneous Ethereum systems.

---

## Problem

Different systems (Safe, Governor, Timelock, Vault):

- execute differently
- emit events at different times
- use different internal semantics

Even with standardized schemas, execution meaning is NOT aligned.

---

## Key Insight

Execution equivalence is defined by:

(target + payloadHash)

NOT:
- systemId
- opType
- nonce

This allows cross-system execution unification.

---

## Pipeline

PoO Events → ETNL → NormalizedExecution → Graph (DAG)

---

## Components

- etnl/normalize.py → Normalization layer
- graph/build_graph.py → DAG construction layer

---

## How to Run

python3 etnl/normalize.py  
python3 graph/build_graph.py

---

## Example

### Input (PoO events)

events = [
    {
        "systemId": "SAFE",
        "operationId": "op1",
        "opType": "CALL",
        "target": "0xABC",
        "payloadHash": "0x123",
        "txIndex": 1
    },
    {
        "systemId": "GOVERNOR",
        "operationId": "op2",
        "opType": "CALL",
        "target": "0xABC",
        "payloadHash": "0x123",
        "proposalId": 42,
        "callIndex": 0
    }
]

---

### Output (NormalizedExecution)

{
  "executionGroupId": "same_hash",
  "executionClass": "...",
  "normalizedNonce": "...",
  "causalParent": null
}

---

### Graph Output

NODES:
X:SAFE
X:GOVERNOR
X:TIMELOCK

EDGES:
GOVERNOR → TIMELOCK

---

## Guarantees

- Deterministic normalization
- Cross-system comparability
- Graph-safe execution grouping

---

## Status

- Schema Alignment ✔
- Runtime Validation ✔
- ETNL ✔
- Graph Construction ✔

Final Verdict:

GRAPH CONSTRUCTION SAFE

---

## Future Work

- Real chain data ingestion
- Visualization layer
- Cross-protocol analytics

