import {ContainerModule} from 'inversify'

import {FindFileInteractor} from './interactors/find-file.interactor'
import {GenerateOutputFilesInteractor} from './interactors/generate-output-files.interactor'

export const BusinessTypes = {
  CvsService: 'CvsService',
  FileGeneratorService: 'FileGeneratorService',
  FactoryService: 'FactoryService',
}

export const businessModule = new ContainerModule(bind => {
  bind(GenerateOutputFilesInteractor).toSelf()
  bind(FindFileInteractor).toSelf()
})
