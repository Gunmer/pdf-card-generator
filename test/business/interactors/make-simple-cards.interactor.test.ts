import {expect, test} from '@oclif/test'
import 'reflect-metadata'
import {instance, mock, verify, when} from 'ts-mockito'

import {MakeSimpleCardsInteractor} from '../../../src/business/interactors/make-simple-cards.interactor'
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

  const filePath = 'file.cvs'
  const outputFile = 'file.html'
  const templateFile = 'template.mustache'
  const cvsData = fixtures.getSimpleCvsData()
  const templateData = fixtures.getTemplateData(cvsData)

  before(() => {
    injector.snapshot()

    injector.rebind(Symbol.for('CvsService')).toConstantValue(instance(cvsService))
    injector.rebind(Symbol.for('FileGeneratorService')).toConstantValue(instance(fileGeneratorService))
    injector.rebind(Symbol.for('FactoryService')).toConstantValue(instance(factoryService))

    interactor = injector.get(MakeSimpleCardsInteractor)
  })

  after(() => {
    injector.restore()
  })

  test.it('should be defined', () => {
    expect(interactor).not.undefined
  })

  test.it('should be call template with data', async () => {
    when(cvsService.readFromFile(filePath)).thenReturn(cvsData)
    when(factoryService.buildTemplateData(cvsData)).thenReturn(templateData)

    await interactor.execute({input: filePath, output: outputFile, template: templateFile})

    verify(fileGeneratorService.generateHtml(templateFile, outputFile, templateData)).called()
  })

})
