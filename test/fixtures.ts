import * as path from 'path'

import {TemplateData} from '../src/business/models/template-data'

// tslint:disable-next-line:no-unnecessary-class
export class Fixtures {
  static getSimpleCvsData() {
    return [
      {
        id: '1',
        title: 'name1',
        message: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
        image: 'https://picsum.photos/300'
      },
      {
        id: '2',
        title: 'name2',
        message: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
        image: 'https://picsum.photos/300'
      },
    ]
  }

  static getTemplateData(rows?: object[]) {
    if (!rows) {
      rows = this.getSimpleCvsData()
    }

    return new TemplateData(rows)
  }

  static getCvsFilePath(fileName = 'demo') {
    return path.resolve(__dirname, `./resources/${fileName}.csv`)
  }

  static getTemplateFilePath(template?: string) {
    const file = template || 'template'
    return path.resolve(__dirname, `./resources/${file}.mustache`)
  }

  static getHtmlFilePath() {
    return path.resolve(__dirname, './resources/demo.html')
  }

  static getTmpDir(append?: string) {
    if (append) {
      return path.resolve(__dirname, '../tmp', append)
    }
    return path.resolve(__dirname, '../tmp')
  }

  static getResourcesDir(append?: string) {
    if (append) {
      return path.resolve(__dirname, './resources', append)
    }
    return path.resolve(__dirname, './resources')
  }

}
