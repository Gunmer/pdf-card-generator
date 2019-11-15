import {expect, test} from '@oclif/test'
import 'reflect-metadata'

import {BusinessTypes} from '../../src/business/business.module'
import {CardGeneratorError} from '../../src/business/errors/card-generator.error'
import {WorkItem} from '../../src/business/models/work-item'
import injector from '../../src/injector'
import {CvsParseService} from '../../src/services/cvs-parse.service'
import {Fixtures} from '../fixtures'

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

  test.it('should parse Work Items', () => {
    const cvsFilePath = Fixtures.getCvsFilePath('RightCsv')

    const workItems = service.parseWorkItems(cvsFilePath)

    expect(workItems).not.undefined
    expect(workItems).has.lengthOf(6)
  })

  test.it('should throw error', () => {
    const cvsFilePath = Fixtures.getCvsFilePath('WrongCsv')

    expect(() => service.parseWorkItems(cvsFilePath)).to.throw(CardGeneratorError, 'Mandatory columns [id, workItemType, parent] not found')
  })
})
