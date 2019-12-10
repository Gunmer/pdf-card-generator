import {Configuration} from '../model/configuration'

export interface JsonService {
  writeFile(jsonFile: string, data: any): Promise<string>
  readFile(jsonFile: string): Promise<any>
  writeConfig(workDir: string, config: Configuration): Promise<string>
  readConfig(workDir: string): Promise<Configuration>
}
