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

  async execute(param: SimpleCardConfig) {
    if (!fs.existsSync(param.outputDir)) {
      fs.mkdirSync(param.outputDir, {recursive: true})
    }

    const filename = path.parse(param.template).name
    let outputJsonFile = path.join(param.outputDir, filename + '.json')
    let outputHtmlFile = path.join(param.outputDir, filename + '.html')
    let outputPdfFile = path.join(param.outputDir, filename + '.pdf')

    const cvsData = this.cvsService.readFromFile(param.input)
    const templateData = this.factoryService.buildTemplateData(cvsData)

    await this.fileGeneratorService.generateJson(outputJsonFile, templateData)
    await this.fileGeneratorService.generateHtml(param.template, outputHtmlFile, templateData)
    return this.fileGeneratorService.generatePdf(outputPdfFile, outputHtmlFile)
  }

}

export interface SimpleCardConfig {
  template: string,
  input: string,
  outputDir: string
}
