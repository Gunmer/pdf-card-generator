import {expect, test} from '@oclif/test'
import * as fs from 'fs'
import 'reflect-metadata'

import {PdfService} from '../../src/business/services/pdf.service'
import {DefaultPdfService} from '../../src/services/default-pdf.service'
import {Fixtures} from '../fixtures'

describe('PdfService', () => {
  let service: PdfService

  before(() => {
    service = new DefaultPdfService()
  })

  test.it('should be defined', () => {
    expect(service).not.undefined
  })

  test.it('should be generate pdf file', async () => {
    const htmlFile = Fixtures.getResources('demo.html')
    const pdfFile = Fixtures.getResources('file.pdf')

    const file = await service.generateFromHtml(htmlFile, pdfFile)

    expect(file).not.undefined
    expect(fs.existsSync(file)).true
    fs.unlinkSync(file)
  })
})
