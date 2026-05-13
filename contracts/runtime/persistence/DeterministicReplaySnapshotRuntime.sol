// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./PersistentExecutionEnvelope.sol";

contract DeterministicReplaySnapshotRuntime {
    using PersistentExecutionEnvelope for PersistentExecutionEnvelope.PersistenceEnvelope;

    struct ReplaySnapshot {
        bytes32 snapshotId;
        bytes32 executionRoot;
        bytes32 topologyRoot;
        bytes32 validationRoot;
        bytes32 semanticClosureRoot;
        bytes32 replayNormalizationRoot;
        bytes32 checkpointId;
        uint256 blockNumber;
        uint256 timestamp;
    }

    mapping(bytes32 => ReplaySnapshot) internal snapshots;

    event SnapshotCreated(bytes32 indexed snapshotId, bytes32 indexed checkpointId, bytes32 validationRoot);

    function createSnapshot(
        bytes32 executionRoot,
        bytes32 topologyRoot,
        bytes32 validationRoot,
        bytes32 semanticClosureRoot,
        bytes32 replayNormalizationRoot,
        bytes32 checkpointId
    ) external returns (bytes32 snapshotId) {
        snapshotId = keccak256(
            abi.encode(
                executionRoot, topologyRoot, validationRoot, semanticClosureRoot, replayNormalizationRoot, checkpointId
            )
        );

        snapshots[snapshotId] = ReplaySnapshot({
            snapshotId: snapshotId,
            executionRoot: executionRoot,
            topologyRoot: topologyRoot,
            validationRoot: validationRoot,
            semanticClosureRoot: semanticClosureRoot,
            replayNormalizationRoot: replayNormalizationRoot,
            checkpointId: checkpointId,
            blockNumber: block.number,
            timestamp: block.timestamp
        });

        emit SnapshotCreated(snapshotId, checkpointId, validationRoot);
    }

    function getSnapshot(bytes32 snapshotId) external view returns (ReplaySnapshot memory) {
        return snapshots[snapshotId];
    }

    function validateSnapshotDeterminism(bytes32 snapshotId) external view returns (bool) {
        ReplaySnapshot memory snapshot = snapshots[snapshotId];

        bytes32 reconstructedId = keccak256(
            abi.encode(
                snapshot.executionRoot,
                snapshot.topologyRoot,
                snapshot.validationRoot,
                snapshot.semanticClosureRoot,
                snapshot.replayNormalizationRoot,
                snapshot.checkpointId
            )
        );

        return reconstructedId == snapshot.snapshotId;
    }
}
