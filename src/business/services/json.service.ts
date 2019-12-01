export interface JsonService {
  writeFile(jsonFile: string, data: any): string
  readFile(jsonFile: string): any
}
