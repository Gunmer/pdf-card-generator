import {expect, test} from '@oclif/test'
import * as fs from 'fs'
import 'reflect-metadata'
import {anyOfClass, anyString, capture, instance, mock, reset, verify, when} from 'ts-mockito'

import {MakeSimpleCardsInteractor} from '../../../src/business/interactors/make-simple-cards.interactor'
import {TemplateData} from '../../../src/business/models/template-data'
import {CvsService} from '../../../src/business/services/cvs.service'
import {FactoryService} from '../../../src/business/services/factory.service'
import {FileGeneratorService} from '../../../src/business/services/file-generator.service'
import injector from '../../../src/injector'
import fixtures from '../../fixtures'

describe('MakeSimpleCardsInteractor', () => {
  let interactor: MakeSimpleCardsInteractor

  let cvsService: CvsService = mock<CvsService>()
  let fileGeneratorService = mock<FileGeneratorService>()
  let factoryService = mock<FactoryService>()

  const filePath = fixtures.getCvsFilePath()
  const templateFile = fixtures.getTemplateFilePath()

  before(() => {
    injector.snapshot()

    injector.rebind(Symbol.for('CvsService')).toConstantValue(instance(cvsService))
    injector.rebind(Symbol.for('FileGeneratorService')).toConstantValue(instance(fileGeneratorService))
    injector.rebind(Symbol.for('FactoryService')).toConstantValue(instance(factoryService))

    interactor = injector.get(MakeSimpleCardsInteractor)
  })

  afterEach(() => {
    reset(cvsService)
    reset(fileGeneratorService)
    reset(factoryService)
  })

  after(() => {
    injector.restore()
  })

  test.it('should be defined', () => {
    expect(interactor).not.undefined
  })

  test.it('should be generate html', async () => {
    const cvsData = fixtures.getSimpleCvsData()
    const templateData = fixtures.getTemplateData(cvsData)

    when(cvsService.readFromFile(filePath)).thenReturn(cvsData)
    when(factoryService.buildTemplateData(cvsData)).thenReturn(templateData)

    await interactor.execute({input: filePath, outputDir: __dirname, template: templateFile})

    verify(fileGeneratorService.generateHtml(anyString(), anyString(), anyOfClass(TemplateData))).called()
  })

  test.it('should be create output directory', async () => {
    const outputDir = fixtures.getTmpDir('a/b/c')
    if (fs.existsSync(outputDir)) {
      fs.rmdirSync(outputDir)
    }

    await interactor.execute({input: filePath, outputDir, template: templateFile})

    expect(fs.existsSync(outputDir)).true
  })

  test.it('should be capture the correct output file name', async () => {
    const outputDir = fixtures.getTmpDir()

    await interactor.execute({input: filePath, outputDir, template: templateFile})

    const outputFile = capture(fileGeneratorService.generateHtml).first()[1]
    expect(outputFile).is.eqls(`${outputDir}/template.html`)
  })

})
