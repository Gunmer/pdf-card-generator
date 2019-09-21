import {inject, injectable} from 'inversify'

import {BusinessTypes} from '../business.module'
import {CvsService} from '../services/cvs.service'
import {FactoryService} from '../services/factory.service'
import {FileGeneratorService} from '../services/file-generator.service'

import {Interactor} from './interactor'

@injectable()
export class MakeSimpleCardsInteractor implements Interactor<SimpleCardConfig, string> {
  constructor(
    @inject(BusinessTypes.CvsService)
    private readonly cvsService: CvsService,
    @inject(BusinessTypes.FileGeneratorService)
    private readonly fileGeneratorService: FileGeneratorService,
    @inject(BusinessTypes.FactoryService)
    private readonly factoryService: FactoryService,
  ) {
  }

  execute(param: SimpleCardConfig): Promise<string> {
    const cvsData = this.cvsService.readFromFile(param.input)
    const templateData = this.factoryService.buildTemplateData(cvsData)

    return this.fileGeneratorService.generateHtml(param.template, param.output, templateData)
  }

}

export interface SimpleCardConfig {
  template: string,
  input: string,
  output: string
}
