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
    return path.resolve(__dirname, './resources/tfs_work_items.csv')
  }

  getTemplateFilePath() {
    return path.resolve(__dirname, './resources/template.mustache')
  }

  getHtmlFilePath() {
    return path.resolve(__dirname, './resources/page.html')
  }

  getTmpDir(append?: string) {
    if (append) {
      return path.resolve(__dirname, '../tmp', append)
    }
    return path.resolve(__dirname, '../tmp')
  }

}

const fixtures = new Fixtures()

export default fixtures
