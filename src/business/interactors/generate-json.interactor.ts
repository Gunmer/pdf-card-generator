import {inject, injectable} from 'inversify'
import * as path from 'path'
import 'reflect-metadata'

import {CardGeneratorError} from '../errors/card-generator.error'
import {Configuration} from '../model/configuration'
import {CsvService} from '../services/csv-service'
import {JsonService} from '../services/json.service'

import {Interactor} from './interactor'

@injectable()
export class GenerateJsonInteractor implements Interactor<GenerateJsonParam, string> {
  constructor(
    @inject('CsvService')
    private readonly cvsService: CsvService,
    @inject('JsonService')
    private readonly jsonService: JsonService,
  ) {
  }

  async execute(param: GenerateJsonParam): Promise<string> {
    let csvData = await this.cvsService.readFromFile(param.csvFile)

    if (!csvData.every(d => this.hasMandatoryFields(d))) {
      throw new CardGeneratorError(1, 'Mandatory columns [id, workItemType, parent] not found')
    }

    csvData = csvData.map((data: any) => {
      if (data.assignedTo) {
        data.assignedTo = {
          email: data.assignedTo.match(/<([^)]+)>/)[1],
          name: data.assignedTo.replace(/<([^)]+)>/, '')
        }
      }

      return data
    })

    let releases = csvData.filter(this.filterRelease).map(this.completeRelease)
    const PBIs = csvData.filter(this.filterPBIs).map(this.completePBI)
    const tasks = csvData.filter(this.filterTasks).map(this.completeTask)
    const bugs = csvData.filter(this.filterBugs).map(this.completeBug)

    let rows: object[] = []
    rows.push(...PBIs)
    rows.push(...bugs)

    releases = releases.map((release: any) => {
      release.childs = rows
        .filter((r: any) => r.parent === release.id)
        .map((r: any) => {
          r.parentId = release.id
          r.parent = {...release}

          return r
        })
      release.workItemsNumber = release.childs.length

      return release
    })

    rows = rows.map((data: any) => {
      data.tasks = tasks
        .filter((t: any) => t.parent === data.id)
        .map((t: any) => {
          t.parentId = data.id
          t.parent = {...data}

          return t
        })
      data.taskNumber = data.tasks.length

      return data
    })

    rows.push(...releases)
    rows.push(...tasks)

    const jsonFile = path.join(param.config.tempFolder, path.parse(param.csvFile).name + '.json')

    return this.jsonService.writeFile(jsonFile, {
      rows,
      count: {
        total: rows.length,
        releases: releases.length,
        PBIs: PBIs.length,
        bugs: bugs.length,
        tasks: tasks.length
      }
    })
  }

  private hasMandatoryFields(data: any): boolean {
    const keys = Object.keys(data)
    return keys.includes('id') && keys.includes('workItemType') && keys.includes('parent')
  }

  private filterPBIs(pbi: any) {
    return pbi.workItemType === 'Product Backlog Item'
  }

  private completePBI(pbi: any) {
    pbi.textColor = 'text-primary'
    pbi.borderColor = 'border-primary'
    pbi.bgColor = 'bg-primary'
    pbi.contrastText = 'text-white'
    pbi.isPBI = true
    pbi.isTask = false
    pbi.isBug = false
    pbi.isRelease = false
    return pbi
  }

  private filterTasks(task: any) {
    return task.workItemType === 'Task'
  }

  private completeTask(task: any) {
    task.textColor = 'text-warning'
    task.borderColor = 'border-warning'
    task.bgColor = 'bg-warning'
    task.contrastText = 'text-dark'
    task.isPBI = false
    task.isTask = true
    task.isBug = false
    task.isRelease = false
    return task
  }

  private filterBugs(bug: any) {
    return bug.workItemType === 'Bug'
  }

  private completeBug(bug: any) {
    bug.textColor = 'text-danger'
    bug.borderColor = 'border-danger'
    bug.bgColor = 'bg-danger'
    bug.contrastText = 'text-white'
    bug.isPBI = false
    bug.isTask = false
    bug.isBug = true
    bug.isRelease = false
    return bug
  }

  private filterRelease(release: any) {
    return release.workItemType === 'Release'
  }

  private completeRelease(release: any) {
    release.textColor = 'text-success'
    release.borderColor = 'border-success'
    release.bgColor = 'bg-success'
    release.contrastText = 'text-white'
    release.isPBI = false
    release.isTask = false
    release.isBug = false
    release.isRelease = true
    return release
  }

}

interface GenerateJsonParam {
  csvFile: string,
  config: Configuration,
}
