// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ReplayRehydrationRuntime {
    struct RehydrationState {
        bytes32 checkpointId;
        bytes32 snapshotId;
        bytes32 restorationRoot;
        bytes32 executionRoot;
        bytes32 topologyRoot;
        bytes32 validationRoot;
        bytes32 semanticClosureRoot;
        bytes32 continuityRoot;
        uint256 restorationOrder;
        uint256 restorationTimestamp;
        bool rehydrated;
    }

    mapping(bytes32 => RehydrationState) internal rehydrationStates;

    event ReplayRehydrated(bytes32 indexed checkpointId, bytes32 indexed restorationRoot, uint256 restorationOrder);

    event ReplayContinuationCreated(
        bytes32 indexed parentCheckpointId, bytes32 indexed continuationCheckpointId, bytes32 continuationRoot
    );

    function rehydrateReplay(
        bytes32 checkpointId,
        bytes32 snapshotId,
        bytes32 executionRoot,
        bytes32 topologyRoot,
        bytes32 validationRoot,
        bytes32 semanticClosureRoot,
        bytes32 continuityRoot,
        uint256 restorationOrder
    ) external returns (bytes32 restorationRoot) {
        restorationRoot = keccak256(
            abi.encode(
                checkpointId,
                snapshotId,
                executionRoot,
                topologyRoot,
                validationRoot,
                semanticClosureRoot,
                continuityRoot,
                restorationOrder
            )
        );

        rehydrationStates[checkpointId] = RehydrationState({
            checkpointId: checkpointId,
            snapshotId: snapshotId,
            restorationRoot: restorationRoot,
            executionRoot: executionRoot,
            topologyRoot: topologyRoot,
            validationRoot: validationRoot,
            semanticClosureRoot: semanticClosureRoot,
            continuityRoot: continuityRoot,
            restorationOrder: restorationOrder,
            restorationTimestamp: block.timestamp,
            rehydrated: true
        });

        emit ReplayRehydrated(checkpointId, restorationRoot, restorationOrder);
    }

    function createReplayContinuation(
        bytes32 parentCheckpointId,
        bytes32 continuationCheckpointId,
        bytes32 continuationExecutionRoot,
        bytes32 continuationTopologyRoot,
        bytes32 continuationValidationRoot,
        bytes32 continuationSemanticClosureRoot
    ) external returns (bytes32 continuationRoot) {
        RehydrationState memory parentState = rehydrationStates[parentCheckpointId];

        require(parentState.rehydrated, "PARENT_NOT_REHYDRATED");

        continuationRoot = keccak256(
            abi.encode(
                parentCheckpointId,
                continuationCheckpointId,
                parentState.restorationRoot,
                continuationExecutionRoot,
                continuationTopologyRoot,
                continuationValidationRoot,
                continuationSemanticClosureRoot
            )
        );

        emit ReplayContinuationCreated(parentCheckpointId, continuationCheckpointId, continuationRoot);
    }

    function validateRehydrationDeterminism(bytes32 checkpointId) external view returns (bool) {
        RehydrationState memory state = rehydrationStates[checkpointId];

        if (!state.rehydrated) {
            return false;
        }

        bytes32 reconstructedRestorationRoot = keccak256(
            abi.encode(
                state.checkpointId,
                state.snapshotId,
                state.executionRoot,
                state.topologyRoot,
                state.validationRoot,
                state.semanticClosureRoot,
                state.continuityRoot,
                state.restorationOrder
            )
        );

        return reconstructedRestorationRoot == state.restorationRoot;
    }

    function reconstructReplayState(bytes32 checkpointId)
        external
        view
        returns (
            bytes32 snapshotId,
            bytes32 executionRoot,
            bytes32 topologyRoot,
            bytes32 validationRoot,
            bytes32 semanticClosureRoot,
            bytes32 continuityRoot,
            bytes32 restorationRoot
        )
    {
        RehydrationState memory state = rehydrationStates[checkpointId];

        return (
            state.snapshotId,
            state.executionRoot,
            state.topologyRoot,
            state.validationRoot,
            state.semanticClosureRoot,
            state.continuityRoot,
            state.restorationRoot
        );
    }

    function validateReplayReentry(
        bytes32 checkpointId,
        bytes32 expectedValidationRoot,
        bytes32 expectedSemanticClosureRoot
    ) external view returns (bool) {
        RehydrationState memory state = rehydrationStates[checkpointId];

        return (state.rehydrated && state.validationRoot == expectedValidationRoot
                && state.semanticClosureRoot == expectedSemanticClosureRoot);
    }

    function deriveDeterministicReentryRoot(bytes32 checkpointId) external view returns (bytes32) {
        RehydrationState memory state = rehydrationStates[checkpointId];

        return keccak256(
            abi.encode(
                state.checkpointId,
                state.restorationRoot,
                state.executionRoot,
                state.topologyRoot,
                state.validationRoot,
                state.semanticClosureRoot,
                state.continuityRoot,
                state.restorationOrder
            )
        );
    }
}
