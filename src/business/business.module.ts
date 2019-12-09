import {ContainerModule} from 'inversify'

import {CopyResourceInteractor} from './interactors/copy-resource.interactor'
import {CreateConfigInteractor} from './interactors/create-config.interactor'
import {FindFileInteractor} from './interactors/find-file.interactor'
import {GenerateHtmlInteractor} from './interactors/generate-html.interactor'
import {GenerateJsonInteractor} from './interactors/generate-json.interactor'
import {GeneratePdfInteractor} from './interactors/generate-pdf.interactor'

export const businessModule = new ContainerModule(bind => {
  bind(FindFileInteractor).toSelf()
  bind(GenerateJsonInteractor).toSelf()
  bind(GenerateHtmlInteractor).toSelf()
  bind(GeneratePdfInteractor).toSelf()
  bind(CreateConfigInteractor).toSelf()
  bind(CopyResourceInteractor).toSelf()
})
