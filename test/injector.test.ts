import {expect, test} from '@oclif/test'
import 'reflect-metadata'

import {FindFileInteractor} from '../src/business/interactors/find-file.interactor'
import {GenerateHtmlInteractor} from '../src/business/interactors/generate-html.interactor'
import {GenerateJsonInteractor} from '../src/business/interactors/generate-json.interactor'
import {GeneratePdfInteractor} from '../src/business/interactors/generate-pdf.interactor'
import {CsvService} from '../src/business/services/csv-service'
import {HtmlService} from '../src/business/services/html.service'
import {JsonService} from '../src/business/services/json.service'
import {PdfService} from '../src/business/services/pdf.service'
import injector from '../src/injector'

describe('Injector', () => {
  test.it('should be get CsvService', () => {
    const csvService = injector.get<CsvService>('CsvService')

    expect(csvService).not.undefined
  })

  test.it('should be get JsonService', () => {
    const jsonService = injector.get<JsonService>('JsonService')

    expect(jsonService).not.undefined
  })

  test.it('should be get HtmlService', () => {
    const htmlService = injector.get<HtmlService>('HtmlService')

    expect(htmlService).not.undefined
  })

  test.it('should be get PdfService', () => {
    const pdfService = injector.get<PdfService>('PdfService')

    expect(pdfService).not.undefined
  })

  test.it('should be get GenerateHtmlInteractor', () => {
    const generateHtmlInteractor = injector.get(GenerateHtmlInteractor)

    expect(generateHtmlInteractor).not.undefined
  })

  test.it('should be get FindFileInteractor', () => {
    const findFileInteractor = injector.get(FindFileInteractor)

    expect(findFileInteractor).not.undefined
  })

  test.it('should be get GenerateJsonInteractor', () => {
    const generateJsonInteractor = injector.get(GenerateJsonInteractor)

    expect(generateJsonInteractor).not.undefined
  })

  test.it('should be get GeneratePdfInteractor', () => {
    const generatePdfInteractor = injector.get(GeneratePdfInteractor)

    expect(generatePdfInteractor).not.undefined
  })
})
