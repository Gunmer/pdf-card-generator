import {expect, test} from '@oclif/test'
import {instance, mock, reset} from 'ts-mockito'

import {GenerateJsonInteractor} from '../../src/business/interactors/generate-json.interactor'
import {CsvService} from '../../src/business/services/csv-service'
import {JsonService} from '../../src/business/services/json.service'
import injector from '../../src/injector'

describe('GenerateJsonInteractor', () => {
  let interactor: GenerateJsonInteractor

  const csvService: CsvService = mock<CsvService>()
  const jsonService: JsonService = mock<JsonService>()

  before(() => {
    injector.snapshot()
    injector.rebind('JsonService').toConstantValue(instance(jsonService))
    injector.rebind('HtmlService').toConstantValue(instance(csvService))

    interactor = injector.get(GenerateJsonInteractor)
  })

  afterEach(() => {
    reset(jsonService)
    reset(csvService)
  })

  after(() => {
    injector.restore()
  })

  test.it('should be defined', () => {
    expect(interactor).not.undefined
  })

})
