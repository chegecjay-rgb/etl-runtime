export interface ValidationViolation {
  readonly path: string;
  readonly reason: string;
}

export interface ValidationResult {
  readonly valid: boolean;
  readonly violations:
    readonly ValidationViolation[];
}

export interface EvidenceValidator {
  validate(
    value: unknown
  ): ValidationResult;
}
