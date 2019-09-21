import {ContainerModule} from 'inversify'

import {BusinessTypes} from '../business/business.module'

import {CvsParseService} from './cvs-parse.service'

export const serviceModule = new ContainerModule(bind => {
  bind(BusinessTypes.CvsService).to(CvsParseService)
})
