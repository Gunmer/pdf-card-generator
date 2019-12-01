import {ContainerModule} from 'inversify'

import {DefaultCsvService} from './default-csv.service'
import {DefaultHtmlService} from './default-html.service'
import {DefaultJsonService} from './default-json.service'
import {DefaultPdfService} from './default-pdf.service'

export const serviceModule = new ContainerModule(bind => {
  bind('CsvService').to(DefaultCsvService)
  bind('JsonService').to(DefaultJsonService)
  bind('HtmlService').to(DefaultHtmlService)
  bind('PdfService').to(DefaultPdfService)
})
