import * as fs from 'fs'
import {inject, injectable} from 'inversify'
import * as path from 'path'

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
    if (!fs.existsSync(param.outputDir)) {
      fs.mkdirSync(param.outputDir, {recursive: true})
    }
    const outputHtmlFile = path.join(param.outputDir, path.parse(param.template).name + '.html')

    const cvsData = this.cvsService.readFromFile(param.input)
    const templateData = this.factoryService.buildTemplateData(cvsData)

    return this.fileGeneratorService.generateHtml(param.template, outputHtmlFile, templateData)
  }

}

export interface SimpleCardConfig {
  template: string,
  input: string,
  outputDir: string
}
