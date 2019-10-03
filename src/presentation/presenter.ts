import * as path from 'path'

import {FindFileInteractor} from '../business/interactors/find-file.interactor'
import {GenerateOutputFilesInteractor} from '../business/interactors/generate-output-files.interactor'

import {UI} from './ui'

export class Presenter {
  constructor(
    private ui: UI,
    private readonly generateOutputFile: GenerateOutputFilesInteractor,
    private readonly findFile: FindFileInteractor,
  ) {
  }

  async run() {
    const workDir = this.ui.getWorkDir()

    const inputFile = this.ui.getInputFile() || await this.selectCsvFile(workDir)
    const templateFile = this.ui.getTemplateFile() || await this.selectMustacheFile(workDir)

    const outputFile = await this.generateOutputFile.execute({input: inputFile, template: templateFile, outputDir: workDir})
    this.ui.showResult(outputFile)
  }

  private async selectCsvFile(workDir: string) {
    const csvFiles = await this.findFile.execute({workDir, ext: '.csv'})

    if (!csvFiles) return Promise.reject('No csv file found')

    if (csvFiles.length === 1) {
      const csv = path.join(workDir, ...csvFiles)
      return Promise.resolve(csv)
    }

    const csv = await this.ui.choose('Choose a csv file', csvFiles)
    return Promise.resolve(path.join(workDir, csv))
  }

  private async selectMustacheFile(workDir: string) {
    const mustacheFiles = await this.findFile.execute({workDir, ext: '.mustache'})

    if (!mustacheFiles) return Promise.reject('No mustache file found')

    if (mustacheFiles.length === 1) {
      const template = path.join(workDir, ...mustacheFiles)
      return Promise.resolve(template)
    }

    const template = await this.ui.choose('Choose a csv file', mustacheFiles)
    return Promise.resolve(path.join(workDir, template))
  }

}
