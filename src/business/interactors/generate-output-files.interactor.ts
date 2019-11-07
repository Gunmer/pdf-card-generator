import * as fs from 'fs'
import {inject, injectable} from 'inversify'
import * as path from 'path'
import 'reflect-metadata'

import {CvsService} from '../services/cvs.service'
import {FactoryService} from '../services/factory.service'
import {FileGeneratorService} from '../services/file-generator.service'

import {Interactor} from './interactor'

@injectable()
export class GenerateOutputFilesInteractor implements Interactor<SimpleCardConfig, string> {
  constructor(
    @inject('CvsService')
    private readonly cvsService: CvsService,
    @inject('FileGeneratorService')
    private readonly fileGeneratorService: FileGeneratorService,
    @inject('FactoryService')
    private readonly factoryService: FactoryService,
  ) {
  }

  async execute(param: SimpleCardConfig) {
    if (!fs.existsSync(param.outputDir)) {
      fs.mkdirSync(param.outputDir, {recursive: true})
    }

    const filename = path.parse(param.input).name
    let outputJsonFile = path.join(param.outputDir, filename + '.json')
    let outputHtmlFile = path.join(param.outputDir, filename + '.html')
    let outputPdfFile = path.join(param.outputDir, filename + '.pdf')

    const cvsData = this.cvsService.readAndProcessFile(param.input)
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
