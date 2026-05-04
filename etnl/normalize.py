import hashlib
from typing import List, Dict, Optional

def keccak256(data: bytes) -> str:
    return hashlib.sha3_256(data).hexdigest()

def encode(*args) -> bytes:
    return "|".join([str(a) for a in args]).encode()

def execution_class(system_id: str) -> str:
    return {
        "SAFE": "ATOMIC_EXECUTION",
        "GOVERNOR": "BATCH_EXECUTION",
        "TIMELOCK": "SCHEDULED_EXECUTION",
        "VAULT": "AGGREGATED_EXECUTION"
    }[system_id]

# ✅ FIXED: removed opType
def execution_fingerprint(event: Dict) -> str:
    return keccak256(encode(
        event.get("target"),
        event.get("payloadHash")
    ))

def normalized_nonce(event: Dict) -> str:
    s = event["systemId"]

    if s == "SAFE":
        return str(event.get("txIndex", 0))

    if s == "GOVERNOR":
        return keccak256(encode(event.get("proposalId"), event.get("callIndex")))

    if s == "TIMELOCK":
        return keccak256(encode(event.get("scheduleHash"), event.get("salt")))

    if s == "VAULT":
        return str(event.get("internalCounter", 0))

    raise Exception("Unknown system")

def execution_group_id(event: Dict) -> str:
    return execution_fingerprint(event)

def execution_phase(system_id: str) -> str:
    return "EXECUTED"

def causal_parent(event: Dict, events: List[Dict]) -> Optional[str]:
    s = event["systemId"]
    fingerprint = execution_fingerprint(event)

    if s == "GOVERNOR":
        return None

    if s == "TIMELOCK":
        for e in events:
            if (
                e["systemId"] == "GOVERNOR" and
                execution_fingerprint(e) == fingerprint and
                e["timestamp"] < event["timestamp"]
            ):
                return execution_group_id(e)

    if s == "VAULT":
        for e in events:
            if (
                e["systemId"] == "TIMELOCK" and
                execution_fingerprint(e) == fingerprint and
                e["timestamp"] < event["timestamp"]
            ):
                return execution_group_id(e)

    return None

def normalized_execution_id(group_id: str, nonce: str, cls: str) -> str:
    return keccak256(encode(group_id, nonce, cls))

def normalize(events: List[Dict]) -> List[Dict]:
    normalized = []

    for event in events:
        cls = execution_class(event["systemId"])
        nonce = normalized_nonce(event)
        group_id = execution_group_id(event)

        norm = {
            "normalizedExecutionId": normalized_execution_id(group_id, nonce, cls),
            "executionClass": cls,
            "executionGroupId": group_id,
            "systemId": event["systemId"],
            "sourceOperationId": event["operationId"],
            "normalizedNonce": nonce,
            "executionPhase": execution_phase(event["systemId"]),
            "causalParent": causal_parent(event, events)
        }

        normalized.append(norm)

    return normalized

if __name__ == "__main__":
    sample_events = [
        {
            "systemId": "SAFE",
            "operationId": "op1",
            "opType": "OP_CALL",
            "target": "0xABC",
            "payloadHash": "hashA",
            "timestamp": 1,
            "txIndex": 1
        },
        {
            "systemId": "GOVERNOR",
            "operationId": "op2",
            "opType": "OP_GOV_EXEC",
            "target": "0xABC",
            "payloadHash": "hashA",
            "timestamp": 2,
            "proposalId": "p1",
            "callIndex": 0
        },
        {
            "systemId": "TIMELOCK",
            "operationId": "op3",
            "opType": "OP_TIMELOCK_EXEC",
            "target": "0xABC",
            "payloadHash": "hashA",
            "timestamp": 3,
            "scheduleHash": "s1",
            "salt": "x"
        }
    ]

    for r in normalize(sample_events):
        print(r)
