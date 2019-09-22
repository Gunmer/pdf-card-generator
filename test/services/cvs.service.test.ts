import {expect, test} from '@oclif/test'
import 'reflect-metadata'

import {BusinessTypes} from '../../src/business/business.module'
import injector from '../../src/injector'
import {CvsParseService} from '../../src/services/cvs-parse.service'
import fixtures from '../fixtures'

describe('CvsService', () => {
  let service: CvsParseService

  const cvsFile = fixtures.getCvsFilePath()

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

  test.it('should not return undefined', () => {
    const result = service.readFromFile(cvsFile)

    expect(result).not.undefined
  })

  test.it('should return an array', () => {
    const result = service.readFromFile(cvsFile)

    expect(Array.isArray(result)).true
  })

  test.it('should have properties name in lower camel case', () => {
    const result = service.readFromFile(cvsFile)

    expect(Object.keys(result[0])).to.eql(['id', 'workItemType', 'title', 'assignedTo', 'remainingWork', 'effort', 'project', 'state'])
  })

  test.it('should have id with value', () => {
    const result = service.readFromFile(cvsFile)

    expect(result[0]).to.have.property('id', '42739')
  })

})
