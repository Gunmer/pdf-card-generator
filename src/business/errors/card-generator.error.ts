export class CardGeneratorError extends Error {
  constructor(readonly code: number, readonly message: string) {
    super(`${code}::${message}`)
  }
}
