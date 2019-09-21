import {ContainerModule} from 'inversify'

import {MakeSimpleCardsInteractor} from './interactors/make-simple-cards.interactor'

export const BusinessTypes = {
  CvsService: Symbol.for('CvsService'),
  FileGeneratorService: Symbol.for('FileGeneratorService'),
  FactoryService: Symbol.for('FactoryService'),
}

export const businessModule = new ContainerModule(bind => {
  bind(MakeSimpleCardsInteractor).toSelf()
})
