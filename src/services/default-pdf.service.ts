import * as HTML5ToPDF from 'html5-to-pdf'
import {injectable} from 'inversify'

import {PdfService} from '../business/services/pdf.service'

@injectable()
export class DefaultPdfService implements PdfService {
  async generateFromHtml(htmlFile: string, pdfFile: string): Promise<string> {
    const html5ToPDF = new HTML5ToPDF({
      inputPath: htmlFile,
      outputPath: pdfFile,
      pdf: {format: 'A4', landscape: false, preferCSSPageSize: true, printBackground: true}
    })

    await html5ToPDF.start()
    await html5ToPDF.build()
    await html5ToPDF.close()

    return pdfFile
  }

}
