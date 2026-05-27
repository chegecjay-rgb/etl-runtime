# CANONICAL SERIALIZATION CONTRACT

## Constitutional Guarantees

- Stable recursive key ordering
- UTF-8 NFC normalization
- LF newline normalization
- Deterministic JSON emission
- Replay-safe canonical hashing

## Forbidden Behaviors

- Platform newline variance
- Mutable serialization formatting
- Non-deterministic object traversal
- Environment-dependent emission

## Canonical Rules

1. All keys are sorted lexicographically
2. All strings are normalized using NFC
3. All newlines are normalized to LF
4. All serialization emits trailing newline
5. Hashing derives only from canonical serialization output
