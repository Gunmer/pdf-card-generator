import {Command, flags} from '@oclif/command'
import * as inquirer from 'inquirer'
import * as path from 'path'

import {CardGeneratorError} from '../business/errors/card-generator.error'
import {FindFileInteractor} from '../business/interactors/find-file.interactor'
import {GenerateHtmlInteractor} from '../business/interactors/generate-html.interactor'
import {GenerateJsonInteractor} from '../business/interactors/generate-json.interactor'
import {GeneratePdfInteractor} from '../business/interactors/generate-pdf.interactor'
import injector from '../injector'

export class Generate extends Command {
  static description = 'generate a pdf file to print'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [{name: 'workDir', required: false, default: process.cwd()}]

  static aliases = ['g', 'gen']

  private readonly findFileInteractor: FindFileInteractor = injector.get(FindFileInteractor)
  private readonly generateJsonInteractor: GenerateJsonInteractor = injector.get(GenerateJsonInteractor)
  private readonly generateHtmlInteractor: GenerateHtmlInteractor = injector.get(GenerateHtmlInteractor)
  private readonly generatePdfInteractor: GeneratePdfInteractor = injector.get(GeneratePdfInteractor)

  async run() {
    const input = this.parse(Generate)

    const csvFile = await this.selectFile(input.args.workDir, '.csv', 'Choose a csv file')
    const templateFile = await this.selectFile(input.args.workDir, '.mustache', 'Choose a template file')

    const jsonFile = await this.generateJsonInteractor.execute(csvFile)
    const htmlFile = await this.generateHtmlInteractor.execute({jsonFile, templateFile})
    const pdfFile = await this.generatePdfInteractor.execute(htmlFile)

    this.log(`Pdf file generated: ${pdfFile}`)
  }

  private async selectFile(workDir: string, ext: string, selectorMessage: string): Promise<string> {
    const files = await this.findFileInteractor.execute({workDir, ext})

    if (!files || files.length < 1) {
      throw new CardGeneratorError(2, 'Can not find csv file')
    }

    if (files.length === 1) {
      return path.join(workDir, ...files)
    }

    const file = await this.chooseFile(selectorMessage, files)
    return path.join(workDir, file)
  }

  private async chooseFile(message: string, files: string[]): Promise<string> {
    const prompt = await inquirer.prompt({type: 'list', message, choices: files, name: 'answer'})
    return prompt.answer
  }
}
