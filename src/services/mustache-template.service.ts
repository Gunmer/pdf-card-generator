import * as fs from 'fs'
import {injectable} from 'inversify'
import * as Mustache from 'mustache'

import {TemplateData} from '../business/models/template-data'
import {TemplateService} from '../business/services/template.service'

@injectable()
export class MustacheTemplateService implements TemplateService {
  generateHtml(templateFile: string, outputFile: string, data: TemplateData): Promise<string> {
    const template = fs.readFileSync(templateFile).toString('utf8')
    const viewRendered = Mustache.render(template, data)

    fs.writeFileSync(outputFile, viewRendered)

    return Promise.resolve(outputFile)
  }
}
