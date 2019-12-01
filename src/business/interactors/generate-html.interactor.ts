import {inject, injectable} from 'inversify'
import 'reflect-metadata'

import {HtmlService} from '../services/html.service'
import {JsonService} from '../services/json.service'

import {Interactor} from './interactor'

@injectable()
export class GenerateHtmlInteractor implements Interactor<GenerateHtmlInteractorParam, string> {
  constructor(
    @inject('JsonService')
    private readonly jsonService: JsonService,
    @inject('HtmlService')
    private readonly htmlService: HtmlService,
  ) {
  }

  async execute(param: GenerateHtmlInteractorParam): Promise<string> {
    const jsonData = this.jsonService.readFile(param.jsonFile)
    const htmlFile = param.jsonFile.replace('.json', '.html')

    return this.htmlService.generateFromTemplate(param.templateFile, htmlFile, jsonData)
  }

}

interface GenerateHtmlInteractorParam {
  jsonFile: string,
  templateFile: string,
}
