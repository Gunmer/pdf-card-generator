import {inject, injectable} from 'inversify'
import 'reflect-metadata'

import {CardGeneratorError} from '../errors/card-generator.error'
import {Configuration} from '../model/configuration'
import {JsonService} from '../services/json.service'

import {Interactor} from './interactor'

@injectable()
export class CheckConfigInteractor implements Interactor<string, Configuration> {
  constructor(
    @inject('JsonService')
    private readonly jsonService: JsonService,
  ) {
  }

  async execute(workDir: string): Promise<Configuration> {
    try {
      return await this.jsonService.readConfig(workDir)
    } catch {
      throw new CardGeneratorError(3, 'Need initialize work directory')
    }
  }

}
