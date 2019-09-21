import {TemplateData} from '../models/template-data'

export interface TemplateService {
  generateHtml(template: string, output: string, data: TemplateData): Promise<string>
}
