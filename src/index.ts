import {Command, flags} from '@oclif/command'
import * as inquirer from 'inquirer'
import * as path from 'path'

import {FindFileInteractor} from './business/interactors/find-file.interactor'
import {GenerateOutputFilesInteractor} from './business/interactors/generate-output-files.interactor'
import injector from './injector'

class CardMaker extends Command {
  static description = 'Generate PDF documents'

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
  }

  static args = [
    {name: 'workDir', required: true, description: 'Work directory'},
    {name: 'input', required: false, description: 'Cvs file input'},
    {name: 'template', required: false, description: 'Mustache template'},
  ]

  private readonly findFile = injector.get(FindFileInteractor)
  private readonly generateOutputFiles = injector.get(GenerateOutputFilesInteractor)

  async run() {
    const parse = this.parse(CardMaker)
    const workDir = parse.args.workDir

    this.log(`Scanning ${workDir} directory ...`)
    const inputFile = parse.args.input || await this.selectCsvFile(workDir)
    const templateFile = parse.args.template || await this.selectMustacheFile(workDir)

    this.log('... start file generations ...')
    const outputFile = await this.generateOutputFiles.execute({
      input: inputFile,
      template: templateFile,
      outputDir: workDir
    })
    this.log(`... the file has been generated: ${outputFile}`)
  }

  async choose(message: string, options: string[]): Promise<string> {
    const prompt = await inquirer.prompt({type: 'list', message, choices: options, name: 'answer'})
    return prompt.answer
  }

  private async selectCsvFile(workDir: string) {
    const csvFiles = await this.findFile.execute({workDir, ext: '.csv'})

    if (!csvFiles) return Promise.reject('No csv file found')

    if (csvFiles.length === 1) {
      const csv = path.join(workDir, ...csvFiles)
      return Promise.resolve(csv)
    }

    const csv = await this.choose('Choose a csv file', csvFiles)
    return Promise.resolve(path.join(workDir, csv))
  }

  private async selectMustacheFile(workDir: string) {
    const mustacheFiles = await this.findFile.execute({workDir, ext: '.mustache'})

    if (!mustacheFiles) return Promise.reject('No mustache file found')

    if (mustacheFiles.length === 1) {
      const template = path.join(workDir, ...mustacheFiles)
      return Promise.resolve(template)
    }

    const template = await this.choose('Choose a csv file', mustacheFiles)
    return Promise.resolve(path.join(workDir, template))
  }

}

export = CardMaker
