import * as fs from 'fs'
import {inject, injectable} from 'inversify'
import * as path from 'path'
import 'reflect-metadata'

import {JsonService} from '../services/json.service'

import {Interactor} from './interactor'

@injectable()
export class CopyResourceInteractor implements Interactor<string, void> {
  constructor(
    @inject('JsonService')
    private readonly jsonService: JsonService,
  ) {
  }

  async execute(workDir: string): Promise<void> {
    const config = await this.jsonService.readConfig(workDir)

    const res = path.join(__dirname, '../../..', 'resource')

    fs.copyFileSync(path.join(res, 'default.mustache'), path.join(config.resFolder.template, 'default.mustache'))
    fs.copyFileSync(path.join(res, 'base.css'), path.join(config.resFolder.style, 'base.css'))
  }

}
