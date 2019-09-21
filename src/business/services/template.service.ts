import {TemplateData} from '../models/template-data'

export interface TemplateService {
  generateFile(template: string, output: string, data: TemplateData): Promise<string>
}
