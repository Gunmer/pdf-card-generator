import {TemplateData} from '../src/business/models/template-data'

class Fixtures {
  // noinspection JSMethodCanBeStatic
  getSimpleCvsData() {
    return [Object.create({id: '1', name: 'name1'}), Object.create({id: '2', name: 'name2'})]
  }

  getTemplateData(rows?: object[]) {
    if (!rows) {
      rows = this.getSimpleCvsData()
    }

    return new TemplateData(rows)
  }
}

const fixtures = new Fixtures()

export default fixtures
