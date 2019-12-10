import {expect, test} from '@oclif/test'
import {capture, instance, mock, reset, when} from 'ts-mockito'

import {GenerateHtmlInteractor} from '../../src/business/interactors/generate-html.interactor'
import {HtmlService} from '../../src/business/services/html.service'
import {JsonService} from '../../src/business/services/json.service'
import injector from '../../src/injector'

describe('GenerateHtmlInteractor', () => {
  let interactor: GenerateHtmlInteractor

  const jsonService: JsonService = mock<JsonService>()
  const htmlService: HtmlService = mock<HtmlService>()

  before(() => {
    injector.snapshot()
    injector.rebind('JsonService').toConstantValue(instance(jsonService))
    injector.rebind('HtmlService').toConstantValue(instance(htmlService))

    interactor = injector.get(GenerateHtmlInteractor)
  })

  afterEach(() => {
    reset(jsonService)
    reset(htmlService)
  })

  after(() => {
    injector.restore()
  })

  test.it('should be defined', () => {
    expect(interactor).not.undefined
  })

  test.it('should be call generateFromTemplate with params', async () => {
    when(jsonService.readFile('jsonFile.json')).thenResolve({})

    await interactor.execute({templateFile: 'templateFile', jsonFile: 'jsonFile.json'})

    const [templateArg, htmlArg, dataArg] = capture(htmlService.generateFromTemplate).first()
    expect(templateArg).equals('templateFile')
    expect(htmlArg).equals('jsonFile.html')
    expect(dataArg instanceof Promise).false
  })
})
