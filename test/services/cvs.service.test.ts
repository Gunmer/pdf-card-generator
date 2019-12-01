import {expect, test} from '@oclif/test'
import 'reflect-metadata'

import {CsvService} from '../../src/business/services/csv-service'
import {DefaultCsvService} from '../../src/services/default-csv.service'
import {Fixtures} from '../fixtures'

describe('CvsService', () => {
  let service: CsvService

  before(() => {
    service = new DefaultCsvService()
  })

  test.it('should be defined', () => {
    expect(service).not.undefined
  })

  test.it('should be return data array', async () => {
    const csvFile = Fixtures.getResources('demo.csv')

    const csvData = await service.readFromFile(csvFile)

    expect(csvData).not.undefined
    expect(csvData).lengthOf(2)
  })

  test.it('should be contain id, workItemType and parent property', async () => {
    const csvFile = Fixtures.getResources('demo.csv')

    const csvData = await service.readFromFile(csvFile)
    const properties = Object.keys(csvData[0])

    expect(properties).contain('id')
    expect(properties).contain('workItemType')
    expect(properties).contain('parent')
  })

})
