import * as path from 'path'

import {Configuration} from '../src/business/model/configuration'

// tslint:disable-next-line:no-unnecessary-class
export class Fixtures {
  static getResources(append?: string): string {
    if (append) {
      return path.resolve(__dirname, './resources', append)
    }
    return path.resolve(__dirname, './resources')
  }

  static getConfig(): Configuration {
    return {
      rootFolder: this.getResources(),
      tempFolder: this.getResources(),
      resFolder: {
        folder: this.getResources(),
        image: '',
        style: '',
        template: this.getResources()
      }
    }
  }
}
