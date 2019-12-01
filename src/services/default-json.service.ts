import * as fs from 'fs'
import {injectable} from 'inversify'

import {JsonService} from '../business/services/json.service'

@injectable()
export class DefaultJsonService implements JsonService {
  async writeFile(jsonFile: string, data: any): Promise<string> {
    const json = JSON.stringify(data, null, 4)
    fs.writeFileSync(jsonFile, json)

    return jsonFile
  }

  async readFile(jsonFile: string): Promise<any> {
    const jsonData = fs.readFileSync(jsonFile, {encoding: 'utf8'})
    return JSON.parse(jsonData)
  }

}
