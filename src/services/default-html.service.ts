import * as fs from 'fs'
import {injectable} from 'inversify'
import * as Mustache from 'mustache'

import {HtmlService} from '../business/services/html.service'

@injectable()
export class DefaultHtmlService implements HtmlService {
  async generateFromTemplate(templateFile: string, htmlFile: string, data: any): Promise<string> {
    const template = fs.readFileSync(templateFile, {encoding: 'utf8'})
    const htmlData = Mustache.render(template, data)
    fs.writeFileSync(htmlFile, htmlData)

    return htmlFile
  }

}
