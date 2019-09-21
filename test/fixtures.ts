import {TemplateData} from '../src/business/models/template-data'

const fixtures = {
  getSimpleCvsData: () => [Object.create({id: '1', name: 'name1'}), Object.create({id: '2', name: 'name2'})],
  getTemplateData: (rows: object[]) => new TemplateData(rows),
}

export default fixtures
