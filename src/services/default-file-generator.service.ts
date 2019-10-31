import * as fs from 'fs'
import * as HTML5ToPDF from 'html5-to-pdf'
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

  async generatePdf(outputFile: string, htmlFile: string): Promise<string> {
    const html5ToPDF = new HTML5ToPDF({
      inputPath: htmlFile,
      outputPath: outputFile,
      pdf: {format: 'A4', landscape: false, preferCSSPageSize: true, printBackground: true}
    })

    await html5ToPDF.start()
    await html5ToPDF.build()
    await html5ToPDF.close()

    return Promise.resolve(outputFile)
  }
}
