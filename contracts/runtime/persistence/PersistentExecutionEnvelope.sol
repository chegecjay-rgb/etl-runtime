// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

library PersistentExecutionEnvelope {
    struct PersistenceMetadata {
        bytes32 snapshotId;
        bytes32 checkpointId;
        bytes32 parentCheckpointId;
        bytes32 executionRoot;
        bytes32 topologyRoot;
        bytes32 validationRoot;
        bytes32 semanticClosureRoot;
        bytes32 replayNormalizationRoot;
        uint256 blockNumber;
        uint256 timestamp;
    }

    struct PersistenceEnvelope {
        bytes32 envelopeId;
        bytes32 lineageRoot;
        bytes32 restorationRoot;
        bytes32 continuityRoot;
        bytes32 ancestryRoot;
        PersistenceMetadata metadata;
    }

    function computeEnvelopeId(PersistenceEnvelope memory envelope) internal pure returns (bytes32) {
        return keccak256(
            abi.encode(
                envelope.lineageRoot,
                envelope.restorationRoot,
                envelope.continuityRoot,
                envelope.ancestryRoot,
                envelope.metadata.snapshotId,
                envelope.metadata.checkpointId,
                envelope.metadata.parentCheckpointId,
                envelope.metadata.executionRoot,
                envelope.metadata.topologyRoot,
                envelope.metadata.validationRoot,
                envelope.metadata.semanticClosureRoot,
                envelope.metadata.replayNormalizationRoot,
                envelope.metadata.blockNumber,
                envelope.metadata.timestamp
            )
        );
    }

    function validateDeterministicIdentity(PersistenceEnvelope memory envelope) internal pure returns (bool) {
        return envelope.envelopeId == computeEnvelopeId(envelope);
    }
}
