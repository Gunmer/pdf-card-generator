import {ContainerModule} from 'inversify'

import {FindFileInteractor} from './interactors/find-file.interactor'

export const BusinessTypes = {
  CvsService: 'CvsService',
  FileGeneratorService: 'FileGeneratorService',
  FactoryService: 'FactoryService',
  JsonService: 'JsonService',
  HtmlService: 'HtmlService',
  PdfService: 'PdfService',
}

export const businessModule = new ContainerModule(bind => {
  bind(FindFileInteractor).toSelf()
})
