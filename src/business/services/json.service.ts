export interface JsonService {
  writeFile(jsonFile: string, data: any): Promise<string>
  readFile(jsonFile: string): Promise<any>
}
