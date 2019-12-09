import {inject, injectable} from 'inversify'
import * as path from 'path'

import {Configuration} from '../model/configuration'
import {PdfService} from '../services/pdf.service'

import {Interactor} from './interactor'

@injectable()
export class GeneratePdfInteractor implements Interactor<GeneratePdfParam, string> {
  constructor(
    @inject('PdfService')
    private readonly pdfService: PdfService,
  ) {
  }

  async execute(param: GeneratePdfParam): Promise<string> {
    const pdfFile = path.join(param.config.rootFolder, path.parse(param.htmlFile).name, '.pdf')
    return this.pdfService.generateFromHtml(param.htmlFile, pdfFile)
  }

}

interface GeneratePdfParam {
  htmlFile: string,
  config: Configuration
}
