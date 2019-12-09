import * as fs from 'fs'
import {inject, injectable} from 'inversify'
import * as path from 'path'

import {Configuration} from '../model/configuration'
import {JsonService} from '../services/json.service'

import {Interactor} from './interactor'

@injectable()
export class CreateConfigInteractor implements Interactor<string, string> {
  constructor(
    @inject('JsonService')
    private readonly jsonService: JsonService,
  ) {
  }

  async execute(workDir: string) {
    const configFile = path.join(workDir, 'configuration.json')
    const config: Configuration = {
      rootFolder: workDir,
      tempFolder: path.join(workDir, 'tmp'),
      resFolder: {
        folder: path.join(workDir, 'resource'),
        image: path.join(workDir, 'resource', 'image'),
        style: path.join(workDir, 'resource', 'style'),
        template: path.join(workDir, 'resource', 'template')
      }
    }

    if (!fs.existsSync(config.tempFolder)) {
      fs.mkdirSync(config.tempFolder)
    }

    if (!fs.existsSync(config.resFolder.folder)) {
      fs.mkdirSync(config.resFolder.folder)
    }

    if (!fs.existsSync(config.resFolder.template)) {
      fs.mkdirSync(config.resFolder.template)
    }

    if (!fs.existsSync(config.resFolder.style)) {
      fs.mkdirSync(config.resFolder.style)
    }

    if (!fs.existsSync(config.resFolder.image)) {
      fs.mkdirSync(config.resFolder.image)
    }

    await this.jsonService.writeFile(configFile, config)

    return configFile
  }
}
