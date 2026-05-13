// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract IncrementalReplayRestorationRuntime {
    struct ReplaySegment {
        bytes32 segmentId;
        bytes32 checkpointId;
        bytes32 parentSegmentId;
        bytes32 segmentExecutionRoot;
        bytes32 segmentTopologyRoot;
        bytes32 segmentValidationRoot;
        bytes32 segmentSemanticClosureRoot;
        bytes32 segmentContinuityRoot;
        uint256 restorationOrder;
        uint256 segmentIndex;
        bool restored;
    }

    struct RestorationWindow {
        bytes32 windowId;
        bytes32 rootCheckpointId;
        bytes32 reconstructionRoot;
        uint256 totalSegments;
        uint256 restoredSegments;
        bool fullyRestored;
    }

    mapping(bytes32 => ReplaySegment) internal replaySegments;
    mapping(bytes32 => RestorationWindow) internal restorationWindows;

    event ReplaySegmentRestored(bytes32 indexed segmentId, bytes32 indexed checkpointId, uint256 indexed segmentIndex);

    event RestorationWindowCreated(bytes32 indexed windowId, bytes32 indexed reconstructionRoot, uint256 totalSegments);

    event RestorationWindowConverged(bytes32 indexed windowId, bytes32 indexed reconstructionRoot);

    function restoreReplaySegment(
        bytes32 checkpointId,
        bytes32 parentSegmentId,
        bytes32 segmentExecutionRoot,
        bytes32 segmentTopologyRoot,
        bytes32 segmentValidationRoot,
        bytes32 segmentSemanticClosureRoot,
        uint256 restorationOrder,
        uint256 segmentIndex
    ) external returns (bytes32 segmentId) {
        bytes32 segmentContinuityRoot = keccak256(
            abi.encode(
                checkpointId,
                parentSegmentId,
                segmentExecutionRoot,
                segmentTopologyRoot,
                segmentValidationRoot,
                segmentSemanticClosureRoot,
                restorationOrder,
                segmentIndex
            )
        );

        segmentId = keccak256(abi.encode(segmentContinuityRoot, restorationOrder));

        replaySegments[segmentId] = ReplaySegment({
            segmentId: segmentId,
            checkpointId: checkpointId,
            parentSegmentId: parentSegmentId,
            segmentExecutionRoot: segmentExecutionRoot,
            segmentTopologyRoot: segmentTopologyRoot,
            segmentValidationRoot: segmentValidationRoot,
            segmentSemanticClosureRoot: segmentSemanticClosureRoot,
            segmentContinuityRoot: segmentContinuityRoot,
            restorationOrder: restorationOrder,
            segmentIndex: segmentIndex,
            restored: true
        });

        emit ReplaySegmentRestored(segmentId, checkpointId, segmentIndex);
    }

    function createRestorationWindow(bytes32 rootCheckpointId, bytes32[] calldata segmentIds)
        external
        returns (bytes32 windowId)
    {
        bytes32 reconstructionRoot = keccak256(abi.encode(rootCheckpointId, segmentIds));

        windowId = keccak256(abi.encode(reconstructionRoot, segmentIds.length));

        restorationWindows[windowId] = RestorationWindow({
            windowId: windowId,
            rootCheckpointId: rootCheckpointId,
            reconstructionRoot: reconstructionRoot,
            totalSegments: segmentIds.length,
            restoredSegments: segmentIds.length,
            fullyRestored: true
        });

        emit RestorationWindowCreated(windowId, reconstructionRoot, segmentIds.length);

        emit RestorationWindowConverged(windowId, reconstructionRoot);
    }

    function validateSegmentRestoration(bytes32 segmentId) external view returns (bool) {
        ReplaySegment memory segment = replaySegments[segmentId];

        if (!segment.restored) {
            return false;
        }

        bytes32 reconstructedContinuityRoot = keccak256(
            abi.encode(
                segment.checkpointId,
                segment.parentSegmentId,
                segment.segmentExecutionRoot,
                segment.segmentTopologyRoot,
                segment.segmentValidationRoot,
                segment.segmentSemanticClosureRoot,
                segment.restorationOrder,
                segment.segmentIndex
            )
        );

        bytes32 reconstructedSegmentId = keccak256(abi.encode(reconstructedContinuityRoot, segment.restorationOrder));

        return
            (reconstructedContinuityRoot == segment.segmentContinuityRoot
                    && reconstructedSegmentId == segment.segmentId);
    }

    function validateRestorationWindow(bytes32 windowId) external view returns (bool) {
        RestorationWindow memory window = restorationWindows[windowId];

        return (window.totalSegments > 0 && window.restoredSegments == window.totalSegments && window.fullyRestored);
    }

    function reconstructSegmentContinuity(bytes32 segmentId)
        external
        view
        returns (
            bytes32 checkpointId,
            bytes32 parentSegmentId,
            bytes32 segmentExecutionRoot,
            bytes32 segmentTopologyRoot,
            bytes32 segmentValidationRoot,
            bytes32 segmentSemanticClosureRoot,
            bytes32 segmentContinuityRoot
        )
    {
        ReplaySegment memory segment = replaySegments[segmentId];

        return (
            segment.checkpointId,
            segment.parentSegmentId,
            segment.segmentExecutionRoot,
            segment.segmentTopologyRoot,
            segment.segmentValidationRoot,
            segment.segmentSemanticClosureRoot,
            segment.segmentContinuityRoot
        );
    }

    function deriveFragmentedContinuityRoot(bytes32 windowId) external view returns (bytes32) {
        RestorationWindow memory window = restorationWindows[windowId];

        return keccak256(
            abi.encode(
                window.windowId,
                window.rootCheckpointId,
                window.reconstructionRoot,
                window.totalSegments,
                window.restoredSegments,
                window.fullyRestored
            )
        );
    }

    function validateRestorationOrdering(bytes32 segmentId, uint256 expectedOrder) external view returns (bool) {
        return replaySegments[segmentId].restorationOrder == expectedOrder;
    }

    function validateSegmentAncestry(bytes32 descendantSegmentId, bytes32 ancestorSegmentId)
        external
        view
        returns (bool)
    {
        bytes32 current = descendantSegmentId;

        while (current != bytes32(0)) {
            if (current == ancestorSegmentId) {
                return true;
            }

            current = replaySegments[current].parentSegmentId;
        }

        return false;
    }
}
