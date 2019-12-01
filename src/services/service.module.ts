import {ContainerModule} from 'inversify'

import {BusinessTypes} from '../business/business.module'

import {CvsParseService} from './cvs-parse.service'
import {DefaultHtmlService} from './default-html.service'
import {DefaultJsonService} from './default-json.service'
import {DefaultPdfService} from './default-pdf.service'

export const serviceModule = new ContainerModule(bind => {
  bind(BusinessTypes.CvsService).to(CvsParseService)
  bind(BusinessTypes.JsonService).to(DefaultJsonService)
  bind(BusinessTypes.HtmlService).to(DefaultHtmlService)
  bind(BusinessTypes.PdfService).to(DefaultPdfService)
})
