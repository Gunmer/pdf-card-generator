import {TemplateData} from '../models/template-data'

export interface FileGeneratorService {
  generateHtml(template: string, output: string, data: TemplateData): Promise<string>
}
