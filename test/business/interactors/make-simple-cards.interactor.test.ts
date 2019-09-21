import {expect, test} from '@oclif/test'
import 'reflect-metadata'
import {instance, mock} from 'ts-mockito'

import {MakeSimpleCardsInteractor} from '../../../src/business/interactors/make-simple-cards.interactor'
import {CvsService} from '../../../src/business/services/cvs.service'
import injector from '../../../src/injector'

describe('MakeSimpleCardsInteractor', () => {
  let interactor: MakeSimpleCardsInteractor

  let cvsService: CvsService = mock<CvsService>()

  before(() => {
    injector.snapshot()

    injector.rebind(Symbol.for('CvsService')).toConstantValue(instance(cvsService))

    interactor = injector.get(MakeSimpleCardsInteractor)
  })

  after(() => {
    injector.restore()
  })

  test.it('should be defined', () => {
    expect(interactor).not.undefined
  })

})
