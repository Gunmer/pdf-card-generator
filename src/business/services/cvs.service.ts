export interface CvsService {
  readFromFile(filePath: string): object[]
  readAndProcessFile(filePath: string): any[]
}
