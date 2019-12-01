import {expect, test} from '@oclif/test'
import * as fs from 'fs'
import 'reflect-metadata'

import {HtmlService} from '../../src/business/services/html.service'
import {DefaultHtmlService} from '../../src/services/default-html.service'
import {Fixtures} from '../fixtures'

describe('HtmlService', () => {
  let service: HtmlService

  before(() => {
    service = new DefaultHtmlService()
  })

  test.it('should be defined', () => {
    expect(service).not.undefined
  })

  test.it('should be generate html file', async () => {
    const templateFile = Fixtures.getResources('demo.mustache')
    const htmlFile = Fixtures.getResources('file.html')
    const data = {rows: [{id: 1, title: 'title'}]}

    const resultFile = await service.generateFromTemplate(templateFile, htmlFile, data)

    expect(resultFile).not.undefined
    expect(fs.existsSync(resultFile)).true
    fs.unlinkSync(resultFile)
  })
})
