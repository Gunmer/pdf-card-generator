import {Command, flags} from '@oclif/command'

import {CreateConfigInteractor} from '../business/interactors/create-config.interactor'
import injector from '../injector'

export default class Initialize extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'})
  }

  static args = [{name: 'workDir', required: false, default: process.cwd()}]

  static aliases = ['i', 'init']

  private readonly createConfigInteractor: CreateConfigInteractor = injector.get(CreateConfigInteractor)

  async run() {
    const input = this.parse(Initialize)

    await this.createConfigInteractor.execute(input.args.workDir)
  }
}
