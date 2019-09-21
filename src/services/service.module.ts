import {ContainerModule} from 'inversify'

import {BusinessTypes} from '../business/business.module'

import {CvsParseService} from './cvs-parse.service'
import {DataFactoryService} from './data-factory.service'
import {DefaultFileGeneratorService} from './default-file-generator.service'

export const serviceModule = new ContainerModule(bind => {
  bind(BusinessTypes.CvsService).to(CvsParseService)
  bind(BusinessTypes.FactoryService).to(DataFactoryService)
  bind(BusinessTypes.FileGeneratorService).to(DefaultFileGeneratorService)
})
