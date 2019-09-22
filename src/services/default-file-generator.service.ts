import * as fs from 'fs'
import {injectable} from 'inversify'
import * as Mustache from 'mustache'

import {TemplateData} from '../business/models/template-data'
import {FileGeneratorService} from '../business/services/file-generator.service'

@injectable()
export class DefaultFileGeneratorService implements FileGeneratorService {
  generateHtml(templateFile: string, outputFile: string, data: TemplateData): Promise<string> {
    const template = fs.readFileSync(templateFile).toString('utf8')
    const viewRendered = Mustache.render(template, data)

    fs.writeFileSync(outputFile, viewRendered)

    return Promise.resolve(outputFile)
  }

  generateJson(outputFile: string, data: TemplateData): Promise<string> {
    const json = JSON.stringify(data, null, 4)
    fs.writeFileSync(outputFile, json)

    return Promise.resolve(outputFile)
  }
}
