import {ContainerModule} from 'inversify'

import {MakeSimpleCardsInteractor} from './interactors/make-simple-cards.interactor'

export const BusinessTypes = {
  CvsService: Symbol.for('CvsService'),
}

export const businessModule = new ContainerModule(bind => {
  bind(MakeSimpleCardsInteractor).toSelf()
})
