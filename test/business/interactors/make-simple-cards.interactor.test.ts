import {expect, test} from '@oclif/test'
import 'reflect-metadata'
import {instance, mock, verify, when} from 'ts-mockito'

import {MakeSimpleCardsInteractor} from '../../../src/business/interactors/make-simple-cards.interactor'
import {TemplateData} from '../../../src/business/models/template-data'
import {CvsService} from '../../../src/business/services/cvs.service'
import {FactoryService} from '../../../src/business/services/factory.service'
import {TemplateService} from '../../../src/business/services/template.service'
import injector from '../../../src/injector'

describe('MakeSimpleCardsInteractor', () => {
  let interactor: MakeSimpleCardsInteractor

  let cvsService: CvsService = mock<CvsService>()
  let templateService = mock<TemplateService>()
  let factoryService = mock<FactoryService>()

  const filePath = 'file.cvs'
  const outputFile = 'file.html'
  const templateFile = 'template.mustache'
  const cvsData = [{id: '1', name: 'name'}]
  const templateData: TemplateData = {rows: cvsData}

  before(() => {
    injector.snapshot()

    injector.rebind(Symbol.for('CvsService')).toConstantValue(instance(cvsService))
    injector.bind(Symbol.for('TemplateService')).toConstantValue(instance(templateService))
    injector.bind(Symbol.for('FactoryService')).toConstantValue(instance(factoryService))

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

    verify(templateService.generateFile(templateFile, outputFile, templateData)).called()
  })

})
