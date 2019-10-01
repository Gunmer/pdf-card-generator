import {expect, test} from '@oclif/test'

import cmd = require('../src')

import fixtures from './fixtures'

describe('tfs-cards', () => {
  test
    .stdout()
    .do(() => cmd.run([fixtures.getCvsFilePath(), fixtures.getTemplateFilePath('tfs'), fixtures.getTmpDir()]))
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('generated')
    })

})
