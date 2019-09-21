import {TemplateData} from '../models/template-data'

export interface FactoryService {
  buildTemplateData(cvsData: object[]): TemplateData
}
