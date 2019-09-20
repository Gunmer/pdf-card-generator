import {expect, test} from '@oclif/test'
import * as path from 'path'

import {CvsService} from '../../src/services/cvs.service'

describe('CvsService', () => {
  let service = new CvsService()

  test.it('should not return undefined', () => {
    const cvsFile = path.resolve(__dirname, '../resources/tfs_work_items.csv')

    const result = service.readFromFile(cvsFile)

    expect(result).not.undefined
  })

  test.it('should return an array', () => {
    const cvsFile = path.resolve(__dirname, '../resources/tfs_work_items.csv')

    const result = service.readFromFile(cvsFile)

    expect(Array.isArray(result)).true
  })

  test.it('should have properties name in lower camel case', () => {
    const cvsFile = path.resolve(__dirname, '../resources/tfs_work_items.csv')

    const result = service.readFromFile(cvsFile)

    expect(Object.keys(result[0])).to.eql(['id', 'workItemType', 'title', 'assignedTo', 'remainingWork', 'effort', 'project', 'state'])
  })

  test.it('should have id with value', () => {
    const cvsFile = path.resolve(__dirname, '../resources/tfs_work_items.csv')

    const result = service.readFromFile(cvsFile)

    expect(result[0]).to.have.property('id', '42739')
  })

})
