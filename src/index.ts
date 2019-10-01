import {Command} from '@oclif/command'

// @ts-ignore
import {GenerateOutputFilesInteractor, SimpleCardConfig} from './business/interactors/generate-output-files.interactor'
// @ts-ignore
import injector from './injector'

class CardMaker extends Command {
  static description = 'Generate PDF documents'

  static args = [
    {name: 'input', description: 'Cvs file input'},
    {name: 'template', description: 'Mustache template'},
    {name: 'output', description: 'Output directory'},
  ]

  private readonly interactor = injector.get(GenerateOutputFilesInteractor)

  async run() {
    const parse = this.parse(CardMaker)

    const param: SimpleCardConfig = {
      input: parse.args.input,
      template: parse.args.template,
      outputDir: parse.args.output,
    }

    const pdfFile = await this.interactor.execute(param)

    this.log(`${pdfFile} generated`)
  }
}

export = CardMaker
