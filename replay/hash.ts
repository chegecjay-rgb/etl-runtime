import { createHash  } from 'crypto'

export function hashReplayTraversal(
  traversal: readonly string[]
): string {
  return createHash('sha256')
    .update(
      JSON.stringify(
        traversal
      )
    )
    .digest('hex')
}
