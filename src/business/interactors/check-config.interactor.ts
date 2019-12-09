import {inject, injectable} from 'inversify'
import 'reflect-metadata'

import {Configuration} from '../model/configuration'
import {JsonService} from '../services/json.service'

@injectable()
export class CheckConfigInteractor {
  constructor(
    @inject('JsonService')
    private readonly jsonService: JsonService,
  ) {
  }

  execute(): Promise<Configuration> | undefined {
    try {
      return this.jsonService.readConfig()
    } catch {
      // tslint:disable-next-line:no-return-undefined
      return undefined
    }
  }

}
