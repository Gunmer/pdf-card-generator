import * as csvParse from 'csv-parse/lib/sync'
import * as fs from 'fs'
import {injectable} from 'inversify'

import {CsvService} from '../business/services/csv-service'

@injectable()
export class DefaultCsvService implements CsvService {
  async readFromFile(filePath: string): Promise<object[]> {
    const cvsFile = fs.readFileSync(filePath)
    return csvParse(cvsFile, {
      columns: headers => headers.map((h: string) => this.toLowerCamelCase(h)),
      skip_empty_lines: true
    })
  }
  private toLowerCamelCase(header: string): string {
    const headerUpperCamelCase = header.trim()
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase())
      .join('')
    return headerUpperCamelCase.charAt(0).toLowerCase() + headerUpperCamelCase.substring(1)
  }
}
