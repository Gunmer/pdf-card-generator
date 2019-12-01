import {inject, injectable} from 'inversify'

import {PdfService} from '../services/pdf.service'

import {Interactor} from './interactor'

@injectable()
export class GeneratePdfInteractor implements Interactor<string, string> {
  constructor(
    @inject('PdfService')
    private readonly pdfService: PdfService,
  ) {
  }

  async execute(htmlFile: string): Promise<string> {
    const pdfFile = htmlFile.replace('.html', '.pdf')
    return this.pdfService.generateFromHtml(htmlFile, pdfFile)
  }

}
