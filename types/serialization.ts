import type {
  CanonicalValue
} from "./evidence.js";

export interface CanonicalSerializer {
  serialize(
    value: CanonicalValue
  ): string;
}
