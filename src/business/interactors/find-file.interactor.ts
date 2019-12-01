import * as fs from 'fs'
import {injectable} from 'inversify'
import * as path from 'path'
import 'reflect-metadata'

import {Interactor} from './interactor'

@injectable()
export class FindFileInteractor implements Interactor<FindFileParam, string[]> {
  async execute(param: FindFileParam): Promise<string[]> {
    return fs.readdirSync(param.workDir)
      .map(file => path.parse(file))
      .filter(file => file.ext === param.ext)
      .map(file => file.base)
  }
}

export interface FindFileParam {
  workDir: string
  ext: string
}
