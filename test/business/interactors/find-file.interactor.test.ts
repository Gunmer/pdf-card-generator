import {expect, test} from '@oclif/test'
import 'reflect-metadata'

import {FindFileInteractor} from '../../../src/business/interactors/find-file.interactor'
import injector from '../../../src/injector'
import fixtures from '../../fixtures'

describe('FindFileInteractor', () => {
  let interactor: FindFileInteractor

  before(() => {
    injector.snapshot()

    interactor = injector.get(FindFileInteractor)
  })

  after(() => {
    injector.restore()
  })

  test.it('should be defined', () => {
    expect(interactor).not.undefined
  })

  test.it('should be find cvs file', async () => {
    const files = await interactor.execute({ext: '.csv', workDir: fixtures.getResourcesDir()})

    expect(files).has.lengthOf(1)
    expect(files).contain('tfs_work_items.csv')
  })

  test.it('should be find mustache files', async () => {
    const files = await interactor.execute({ext: '.mustache', workDir: fixtures.getResourcesDir()})

    expect(files).has.lengthOf(2)
    expect(files).contain('tfs.mustache')
  })

})
