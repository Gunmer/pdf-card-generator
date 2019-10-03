import * as path from 'path'

import {TemplateData} from '../src/business/models/template-data'

class Fixtures {
  // noinspection JSMethodCanBeStatic
  getSimpleCvsData() {
    return [
      {id: '1', title: 'name1', message: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...', image: 'https://picsum.photos/300'},
      {id: '2', title: 'name2', message: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...', image: 'https://picsum.photos/300'},
    ]
  }

  getTemplateData(rows?: object[]) {
    if (!rows) {
      rows = this.getSimpleCvsData()
    }

    return new TemplateData(rows)
  }

  getCvsFilePath() {
    return path.resolve(__dirname, './resources/demo.csv')
  }

  getTemplateFilePath(template?: string) {
    const file = template || 'template'
    return path.resolve(__dirname, `./resources/${file}.mustache`)
  }

  getHtmlFilePath() {
    return path.resolve(__dirname, './resources/demo.html')
  }

  getTmpDir(append?: string) {
    if (append) {
      return path.resolve(__dirname, '../tmp', append)
    }
    return path.resolve(__dirname, '../tmp')
  }

  getResourcesDir(append?: string) {
    if (append) {
      return path.resolve(__dirname, './resources', append)
    }
    return path.resolve(__dirname, './resources')
  }

}

const fixtures = new Fixtures()

export default fixtures
