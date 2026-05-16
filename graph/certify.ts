import { sha256 } from './hashes'

import {
  stableStringify,
} from './normalize'

export function certifyGraphHash(
  value: unknown
): string {
  return sha256(
    stableStringify(value)
  )
}
