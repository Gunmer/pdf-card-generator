import {expect, test} from '@oclif/test'
import * as inquirer from 'inquirer'

import cmd = require('../src')

import fixtures from './fixtures'

describe('tfs-cards', () => {
  test
    .stdout()
    .do(() => cmd.run([fixtures.getResourcesDir(), fixtures.getCvsFilePath(), fixtures.getTemplateFilePath('demo')]))
    .it('runs with workDir, inputFile and template', ctx => {
      expect(ctx.stdout).to.eql(`The file has been generated: ${fixtures.getResourcesDir('demo.pdf')}\n`)
    })

  test
    .stdout()
    .stub(inquirer, 'prompt', () => Promise.resolve({answer: 'demo.mustache'}))
    .do(() => cmd.run([fixtures.getResourcesDir()]))
    .it('runs with workDir', ctx => {
      expect(ctx.stdout).to.eql(`The file has been generated: ${fixtures.getResourcesDir('demo.pdf')}\n`)
    })
})
