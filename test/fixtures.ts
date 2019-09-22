import * as path from 'path'

import {TemplateData} from '../src/business/models/template-data'

class Fixtures {
  // noinspection JSMethodCanBeStatic
  getSimpleCvsData() {
    return [{id: '1', name: 'name1'}, {id: '2', name: 'name2'}]
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

  getTmpDir(append?: string) {
    if (append) {
      return path.resolve(__dirname, '../tmp', append)
    }
    return path.resolve(__dirname, '../tmp')
  }

}

const fixtures = new Fixtures()

export default fixtures
