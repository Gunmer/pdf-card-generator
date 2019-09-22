import {expect, test} from '@oclif/test'
import * as fs from 'fs'
import * as path from 'path'
import 'reflect-metadata'

import {BusinessTypes} from '../../src/business/business.module'
import {FileGeneratorService} from '../../src/business/services/file-generator.service'
import injector from '../../src/injector'
import fixtures from '../fixtures'

describe('TemplateService', () => {
  let service: FileGeneratorService

  const templateData = fixtures.getTemplateData()
  const templateFile = fixtures.getTemplateFilePath()
  const outputFile = path.resolve(__dirname, '../resources/template.html')

  before(() => {
    injector.snapshot()

    service = injector.get<FileGeneratorService>(BusinessTypes.FileGeneratorService)
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
