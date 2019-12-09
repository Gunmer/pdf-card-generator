import {Command, flags} from '@oclif/command'

import {CopyResourceInteractor} from '../business/interactors/copy-resource.interactor'
import {CreateConfigInteractor} from '../business/interactors/create-config.interactor'
import injector from '../injector'

export default class Initialize extends Command {
  static description = 'create config file and copy resources'

  static flags = {
    help: flags.help({char: 'h'})
  }

  static args = [{name: 'workDir', required: false, default: process.cwd()}]

  static aliases = ['i', 'init']

  private readonly createConfigInteractor: CreateConfigInteractor = injector.get(CreateConfigInteractor)
  private readonly copyResourceInteractor: CopyResourceInteractor = injector.get(CopyResourceInteractor)

  async run() {
    const input = this.parse(Initialize)
    this.log('Initialize work directory')

    const configFile = await this.createConfigInteractor.execute(input.args.workDir)
    this.log(`Created config file: ${configFile}`)

    await this.copyResourceInteractor.execute()
    this.log('Copy resources')
  }
}
