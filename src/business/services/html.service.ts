export interface HtmlService {
  generateFromTemplate(templateFile: string, htmlFile: string, data: any): Promise<string>
}
