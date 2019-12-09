import {expect, test} from '@oclif/test'

describe('initialize', () => {
  test
    .skip()
    .stdout()
    .command(['initialize'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .skip()
    .stdout()
    .command(['initialize', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})
