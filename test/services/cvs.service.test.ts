import {expect, test} from '@oclif/test'
import 'reflect-metadata'

import {BusinessTypes} from '../../src/business/business.module'
import injector from '../../src/injector'
import {CvsParseService} from '../../src/services/cvs-parse.service'

describe('CvsService', () => {
  let service: CvsParseService

  before(() => {
    injector.snapshot()

    service = injector.get<CvsParseService>(BusinessTypes.CvsService)
  })

  after(() => {
    injector.restore()
  })

  test.it('should be defined', () => {
    expect(service).not.undefined
  })

})
