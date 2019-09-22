import * as fs from 'fs'
import * as pdf from 'html-pdf'
import {injectable} from 'inversify'
import * as Mustache from 'mustache'

import {TemplateData} from '../business/models/template-data'
import {FileGeneratorService} from '../business/services/file-generator.service'

@injectable()
export class DefaultFileGeneratorService implements FileGeneratorService {
  generateHtml(templateFile: string, outputFile: string, data: TemplateData): Promise<string> {
    return new Promise<string>(resolve => {
      const template = fs.readFileSync(templateFile).toString('utf8')
      const viewRendered = Mustache.render(template, data)

      fs.writeFileSync(outputFile, viewRendered)

      resolve(outputFile)
    })
  }

  generateJson(outputFile: string, data: TemplateData): Promise<string> {
    return new Promise<string>(resolve => {
      const json = JSON.stringify(data, null, 4)
      fs.writeFileSync(outputFile, json)

      resolve(outputFile)
    })
  }

  generatePdf(outputFile: string, htmlFile: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const html = fs.readFileSync(htmlFile, 'utf8')
      pdf.create(html, {format: 'A4'}).toFile(outputFile, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res.filename)
        }
      })
    })
  }
}
