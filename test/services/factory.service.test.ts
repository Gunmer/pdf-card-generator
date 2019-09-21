import {expect, test} from '@oclif/test'
import 'reflect-metadata'

import {BusinessTypes} from '../../src/business/business.module'
import {FactoryService} from '../../src/business/services/factory.service'
import injector from '../../src/injector'
import fixtures from '../fixtures'

describe('FactoryService', () => {
  let service: FactoryService

  before(() => {
    injector.snapshot()

    service = injector.get<FactoryService>(BusinessTypes.FactoryService)
  })

  after(() => {
    injector.restore()
  })

  test.it('should be defined', () => {
    expect(service).not.undefined
  })

  test.it('should retrieve TemplateData with cvsData', () => {
    const cvsData = fixtures.getSimpleCvsData()

    const templateData = service.buildTemplateData(cvsData)

    expect(templateData).is.not.undefined
    expect(templateData.rows).is.eqls(cvsData)
  })

})
