import { createHash } from "node:crypto";

import {
  stableSerialize
} from "./format";

export interface OutputCertification {
  readonly hash: string;
  readonly serialized: string;
}

export function certifyOutput(
  value: unknown
): Readonly<OutputCertification> {
  const serialized = stableSerialize(value);

  const hash = createHash("sha256")
    .update(serialized, "utf8")
    .digest("hex");

  return Object.freeze({
    hash,
    serialized
  });
}

export function certificationsEquivalent(
  left: OutputCertification,
  right: OutputCertification
): boolean {
  return (
    left.hash === right.hash &&
    left.serialized === right.serialized
  );
}
