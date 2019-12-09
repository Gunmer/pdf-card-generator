# pdf-card-generator

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/pdf-card-generator.svg)](https://npmjs.org/package/pdf-card-generator)
[![Downloads/week](https://img.shields.io/npm/dw/pdf-card-generator.svg)](https://npmjs.org/package/pdf-card-generator)
[![License](https://img.shields.io/npm/l/pdf-card-generator.svg)](https://github.com/Gunmer/pdf-card-generator/blob/master/package.json)

It generates cards for scrum or kanban from a csv file and a mustache template.

As a result, it generates a json with the data extracted from the csv, an htm file and finally the resulting pdf.

* [Install](##Install)
* [Version](##Version)

<!-- toc -->
* [pdf-card-generator](#pdf-card-generator)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

## Install
It is necessary to have [NodeJS](https://nodejs.org/es/) installed 
```shell script
$ npm install -g pdf-card-generator
$ cardGen COMMAND
running command...
```

## Version

```shell script
$ cardGen (-v|--version|version)
pdf-card-generator/1.0.2 darwin-x64 node-v12.7.0
```

# Usage
<!-- usage -->
```sh-session
$ npm install -g pdf-card-generator
$ cardGen COMMAND
running command...
$ cardGen (-v|--version|version)
pdf-card-generator/2.0.0 darwin-x64 node-v12.7.0
$ cardGen --help [COMMAND]
USAGE
  $ cardGen COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cardGen generate [WORKDIR]`](#cardgen-generate-workdir)
* [`cardGen help [COMMAND]`](#cardgen-help-command)
* [`cardGen initialize [WORKDIR]`](#cardgen-initialize-workdir)

## `cardGen generate [WORKDIR]`

generate a pdf file to print

```
USAGE
  $ cardGen generate [WORKDIR]

OPTIONS
  -h, --help  show CLI help

ALIASES
  $ cardGen g
  $ cardGen gen
```

_See code: [src/commands/generate.ts](https://github.com/Gunmer/pdf-card-generator/blob/v2.0.0/src/commands/generate.ts)_

## `cardGen help [COMMAND]`

display help for cardGen

```
USAGE
  $ cardGen help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_

## `cardGen initialize [WORKDIR]`

create config file and copy resources

```
USAGE
  $ cardGen initialize [WORKDIR]

OPTIONS
  -h, --help  show CLI help

ALIASES
  $ cardGen i
  $ cardGen init
```

_See code: [src/commands/initialize.ts](https://github.com/Gunmer/pdf-card-generator/blob/v2.0.0/src/commands/initialize.ts)_
<!-- commandsstop -->
