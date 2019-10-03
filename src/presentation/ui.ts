export interface UI {
  getInputFile(): string
  getTemplateFile(): string
  getWorkDir(): string
  choose(message: string, options: string[]): Promise<string>
  showResult(outputFile: string): void
}
