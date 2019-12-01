import {inject, injectable} from 'inversify'

import {BusinessTypes} from '../business.module'
import {PdfService} from '../services/pdf.service'

import {Interactor} from './interactor'

@injectable()
export class GeneratePdfInteractor implements Interactor<string, string> {
  constructor(
    @inject(BusinessTypes.PdfService)
    private readonly pdfService: PdfService,
  ) {
  }

  async execute(htmlFile: string): Promise<string> {
    const pdfFile = htmlFile.replace('.html', '.pdf')
    return this.pdfService.generateFromHtml(htmlFile, pdfFile)
  }

}
