import {expect, test} from '@oclif/test'
import * as fs from 'fs'
import 'reflect-metadata'

import {JsonService} from '../../src/business/services/json.service'
import {DefaultJsonService} from '../../src/services/default-json.service'
import {Fixtures} from '../fixtures'

describe('JsonService', () => {
  let service: JsonService

  before(() => {
    service = new DefaultJsonService()
  })

  test.it('should be defined', () => {
    expect(service).not.undefined
  })

  test.it('should be read demo.json', async () => {
    const jsonFile = Fixtures.getResources('demo.json')

    const jsonData = await service.readFile(jsonFile)

    expect(jsonData).not.undefined
    expect(jsonData.rows).not.undefined
    expect(jsonData.rows[0].title).not.undefined
  })

  test.it('should be write file.json', async () => {
    const jsonData = {data: 'data of json'}

    const jsonFile = Fixtures.getResources('file.json')
    const file = await service.writeFile(jsonFile, jsonData)

    expect(file).not.undefined
    expect(fs.existsSync(file)).true
    fs.unlinkSync(file)
  })
})
