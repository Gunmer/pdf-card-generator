import * as fs from 'fs'
import {injectable} from 'inversify'
import * as path from 'path'
import 'reflect-metadata'

import {Interactor} from './interactor'

@injectable()
export class FindFileInteractor implements Interactor<FindFileParam, string[]> {
  execute(param: FindFileParam): Promise<string[]> {
    return new Promise(resolve => {
      const files = fs.readdirSync(param.workDir)
        .map(file => path.parse(file))
        .filter(file => file.ext === param.ext)
        .map(file => file.base)

      resolve(files)
    })
  }

}

export interface FindFileParam {
  workDir: string
  ext: string
}
