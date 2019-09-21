import {injectable} from 'inversify'

import {TemplateData} from '../business/models/template-data'
import {FactoryService} from '../business/services/factory.service'

@injectable()
export class DataFactoryService implements FactoryService {
  buildTemplateData(cvsData: object[]): TemplateData {
    return new TemplateData(cvsData)
  }
}
