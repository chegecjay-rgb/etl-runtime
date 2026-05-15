export type EvidenceKind =
  | "ERC8241_DISCLOSURE"
  | "PROOF_OF_OPERATION"
  | "ETNL_OUTPUT"
  | "GRAPH_REFERENCE"

export type CanonicalEvidenceInput = Readonly<{
  kind: EvidenceKind
  id: string
  timestamp: string
  payload: Readonly<Record<string, unknown>>
}>
