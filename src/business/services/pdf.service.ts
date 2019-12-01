export interface PdfService {
  generateFromHtml(htmlFile: string, pdfFile: string): Promise<string>
}
