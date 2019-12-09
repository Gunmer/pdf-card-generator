import * as fs from 'fs'
import {inject, injectable} from 'inversify'
import * as path from 'path'

import {JsonService} from '../services/json.service'

import {Interactor} from './interactor'

@injectable()
export class CopyResourceInteractor implements Interactor<void, void> {
  constructor(
    @inject('JsonService')
    private readonly jsonService: JsonService,
  ) {
  }

  async execute(): Promise<void> {
    const config = await this.jsonService.readConfig()

    const res = path.join(__dirname, '../../..', 'resource')

    fs.copyFileSync(path.join(res, 'template.mustache'), path.join(config.resFolder.template, 'template.mustache'))
  }

}
