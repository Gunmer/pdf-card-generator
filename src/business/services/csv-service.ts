export interface CsvService {
  readFromFile(filePath: string): Promise<object[]>
}
