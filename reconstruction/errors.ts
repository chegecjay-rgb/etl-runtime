export class ReconstructionError extends Error {
  public readonly code: string;

  public constructor(code: string, message: string) {
    super(message);

    this.name = "ReconstructionError";
    this.code = code;
  }
}
