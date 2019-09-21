import {inject, injectable} from 'inversify'

import {BusinessTypes} from '../business.module'
import {CvsService} from '../services/cvs.service'

import {Interactor} from './interactor'

@injectable()
export class MakeSimpleCardsInteractor implements Interactor<SimpleCardConfig, string> {
  constructor(
    @inject(BusinessTypes.CvsService)
    private readonly cvsService: CvsService,
  ) {
  }

  execute(param: SimpleCardConfig): Promise<string> {
    return Promise.reject('Not implement yet')
  }

}

export interface SimpleCardConfig {
  template: string,
  data: object,
  output: string
}
