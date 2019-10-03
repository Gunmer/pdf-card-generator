import {Command} from '@oclif/command'
import * as inquirer from 'inquirer'

import {FindFileInteractor} from './business/interactors/find-file.interactor'
// @ts-ignore
import {GenerateOutputFilesInteractor} from './business/interactors/generate-output-files.interactor'
// @ts-ignore
import injector from './injector'
import {Presenter} from './presentation/presenter'
import {UI} from './presentation/ui'

class CardMaker extends Command implements UI {
  static description = 'Generate PDF documents'

  static args = [
    {name: 'workDir', required: true, description: 'Work directory'},
    {name: 'input', required: false, description: 'Cvs file input'},
    {name: 'template', required: false, description: 'Mustache template'},
  ]

  private readonly findFile = injector.get(FindFileInteractor)
  private readonly generateOutputFiles = injector.get(GenerateOutputFilesInteractor)
  private readonly presenter = new Presenter(this, this.generateOutputFiles, this.findFile)

  async run() {
    await this.presenter.run()
  }

  async choose(message: string, options: string[]): Promise<string> {
    const prompt = await inquirer.prompt({type: 'list', message, choices: options, name: 'answer'})
    return prompt.answer
  }

  getInputFile(): string {
    return this.parse(CardMaker).args.input
  }

  getTemplateFile(): string {
    return this.parse(CardMaker).args.template
  }

  getWorkDir(): string {
    return this.parse(CardMaker).args.workDir
  }

  showResult(outputFile: string): void {
    this.log(`The file has been generated: ${outputFile}`)
  }
}

export = CardMaker
