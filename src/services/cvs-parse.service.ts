import * as parse from 'csv-parse/lib/sync'
import * as fs from 'fs'
import {injectable} from 'inversify'

import {CvsService} from '../business/services/cvs.service'

@injectable()
export class CvsParseService implements CvsService {
  readFromFile(filePath: string) {
    const cvsFile = fs.readFileSync(filePath)
    return parse(cvsFile, {
      columns: h => this.formatHeaders(h),
      skip_empty_lines: true
    })
  }

  private formatHeaders(headers: string[]) {
    return headers.map(row => this.toLowerCamelCase(row))
  }

  // noinspection JSMethodCanBeStatic
  private toLowerCamelCase(header: string): string {
    const headerUpperCamelCase = header.trim()
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase())
      .join('')
    return headerUpperCamelCase.charAt(0).toLowerCase() + headerUpperCamelCase.substring(1)
  }
}
