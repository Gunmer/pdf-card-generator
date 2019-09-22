import {ContainerModule} from 'inversify'

import {GenerateOutputFilesInteractor} from './interactors/generate-output-files.interactor'

export const BusinessTypes = {
  CvsService: Symbol.for('CvsService'),
  FileGeneratorService: Symbol.for('FileGeneratorService'),
  FactoryService: Symbol.for('FactoryService'),
}

export const businessModule = new ContainerModule(bind => {
  bind(GenerateOutputFilesInteractor).toSelf()
})
