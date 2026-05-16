export interface CanonicalGraphNode {
  readonly nodeId: string
  readonly executionId: string
  readonly parentExecutionId: string | null
  readonly depth: number | null
  readonly ordinal: number
  readonly hash: string
}

export interface CanonicalGraphEdge {
  readonly edgeId: string
  readonly parentNodeId: string
  readonly childNodeId: string
  readonly ordinal: number
  readonly hash: string
}

export interface CanonicalProjectionRecord {
  readonly executionId: string
  readonly parentExecutionId: string | null
  readonly ordinal: number
  readonly timestamp: string
}

export interface CanonicalExecutionDAG {
  readonly graphHash: string
  readonly nodes: readonly CanonicalGraphNode[]
  readonly edges: readonly CanonicalGraphEdge[]
  readonly adjacency: ReadonlyMap<string, readonly string[]>
  readonly reverseAdjacency: ReadonlyMap<string, readonly string[]>
  readonly roots: readonly string[]
  readonly orphans: readonly string[]
}
