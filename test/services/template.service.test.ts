import {expect, test} from '@oclif/test'
import * as fs from 'fs'
import * as path from 'path'
import 'reflect-metadata'

import {BusinessTypes} from '../../src/business/business.module'
import {TemplateService} from '../../src/business/services/template.service'
import injector from '../../src/injector'
import fixtures from '../fixtures'

describe('TemplateService', () => {
  let service: TemplateService

  const templateData = fixtures.getTemplateData()
  const templateFile = path.resolve(__dirname, '../resources/template.mustache')
  const outputFile = path.resolve(__dirname, '../resources/template.html')

  before(() => {
    injector.snapshot()

    service = injector.get<TemplateService>(BusinessTypes.TemplateService)
  })

  afterEach(() => {
    if (fs.existsSync(outputFile)) {
      fs.unlinkSync(outputFile)
    }
  })

  after(() => {
    injector.restore()
  })

  test.it('should be defined', () => {
    expect(service).not.undefined
  })

  test.it('should be return path of output file', async () => {
    const generateFile = await service.generateHtml(templateFile, outputFile, templateData)

    expect(generateFile).not.undefined
  })

  test.it('should generate file', async () => {
    const generateFile = await service.generateHtml(templateFile, outputFile, templateData)

    expect(fs.existsSync(generateFile)).is.true
  })

})
