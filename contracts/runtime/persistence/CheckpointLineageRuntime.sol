// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract CheckpointLineageRuntime {
    struct Checkpoint {
        bytes32 checkpointId;
        bytes32 parentCheckpointId;
        bytes32 snapshotId;
        bytes32 executionRoot;
        bytes32 topologyRoot;
        bytes32 validationRoot;
        bytes32 semanticClosureRoot;
        bytes32 continuityRoot;
        uint256 lineageDepth;
        uint256 blockNumber;
        uint256 timestamp;
    }

    mapping(bytes32 => Checkpoint) internal checkpoints;

    event CheckpointCreated(
        bytes32 indexed checkpointId, bytes32 indexed parentCheckpointId, bytes32 indexed continuityRoot
    );

    function createCheckpoint(
        bytes32 parentCheckpointId,
        bytes32 snapshotId,
        bytes32 executionRoot,
        bytes32 topologyRoot,
        bytes32 validationRoot,
        bytes32 semanticClosureRoot
    ) external returns (bytes32 checkpointId) {
        uint256 parentDepth = checkpoints[parentCheckpointId].lineageDepth;

        bytes32 continuityRoot = keccak256(
            abi.encode(parentCheckpointId, snapshotId, executionRoot, topologyRoot, validationRoot, semanticClosureRoot)
        );

        checkpointId = keccak256(abi.encode(continuityRoot, parentDepth + 1));

        checkpoints[checkpointId] = Checkpoint({
            checkpointId: checkpointId,
            parentCheckpointId: parentCheckpointId,
            snapshotId: snapshotId,
            executionRoot: executionRoot,
            topologyRoot: topologyRoot,
            validationRoot: validationRoot,
            semanticClosureRoot: semanticClosureRoot,
            continuityRoot: continuityRoot,
            lineageDepth: parentDepth + 1,
            blockNumber: block.number,
            timestamp: block.timestamp
        });

        emit CheckpointCreated(checkpointId, parentCheckpointId, continuityRoot);
    }

    function getCheckpoint(bytes32 checkpointId) external view returns (Checkpoint memory) {
        return checkpoints[checkpointId];
    }

    function validateCheckpointLineage(bytes32 checkpointId) external view returns (bool) {
        Checkpoint memory checkpoint = checkpoints[checkpointId];

        bytes32 reconstructedContinuityRoot = keccak256(
            abi.encode(
                checkpoint.parentCheckpointId,
                checkpoint.snapshotId,
                checkpoint.executionRoot,
                checkpoint.topologyRoot,
                checkpoint.validationRoot,
                checkpoint.semanticClosureRoot
            )
        );

        bytes32 reconstructedCheckpointId = keccak256(abi.encode(reconstructedContinuityRoot, checkpoint.lineageDepth));

        return reconstructedContinuityRoot == checkpoint.continuityRoot
            && reconstructedCheckpointId == checkpoint.checkpointId;
    }

    function validateCheckpointAncestry(bytes32 descendantCheckpointId, bytes32 ancestorCheckpointId)
        external
        view
        returns (bool)
    {
        bytes32 current = descendantCheckpointId;

        while (current != bytes32(0)) {
            if (current == ancestorCheckpointId) {
                return true;
            }

            current = checkpoints[current].parentCheckpointId;
        }

        return false;
    }

    function reconstructContinuityPath(bytes32 checkpointId) external view returns (bytes32[] memory) {
        uint256 depth = checkpoints[checkpointId].lineageDepth;

        bytes32[] memory path = new bytes32[](depth);

        bytes32 current = checkpointId;
        uint256 index = depth;

        while (current != bytes32(0) && index > 0) {
            index--;

            path[index] = current;

            current = checkpoints[current].parentCheckpointId;
        }

        return path;
    }

    function deriveRestorationRoot(bytes32 checkpointId) external view returns (bytes32) {
        Checkpoint memory checkpoint = checkpoints[checkpointId];

        return keccak256(
            abi.encode(
                checkpoint.checkpointId,
                checkpoint.parentCheckpointId,
                checkpoint.snapshotId,
                checkpoint.executionRoot,
                checkpoint.topologyRoot,
                checkpoint.validationRoot,
                checkpoint.semanticClosureRoot,
                checkpoint.continuityRoot,
                checkpoint.lineageDepth
            )
        );
    }
}
