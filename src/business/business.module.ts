import {ContainerModule} from 'inversify'

import {FindFileInteractor} from './interactors/find-file.interactor'

export const BusinessTypes = {
  CvsService: 'CvsService',
  FileGeneratorService: 'FileGeneratorService',
  FactoryService: 'FactoryService',
}

export const businessModule = new ContainerModule(bind => {
  bind(FindFileInteractor).toSelf()
})
