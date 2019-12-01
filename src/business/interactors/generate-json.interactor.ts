import {inject, injectable} from 'inversify'

import {BusinessTypes} from '../business.module'
import {CardGeneratorError} from '../errors/card-generator.error'
import {CvsService} from '../services/cvs.service'
import {JsonService} from '../services/json.service'

import {Interactor} from './interactor'

@injectable()
export class GenerateJsonInteractor implements Interactor<string, string> {
  constructor(
    @inject(BusinessTypes.CvsService)
    private readonly cvsService: CvsService,
    @inject(BusinessTypes.JsonService)
    private readonly jsonService: JsonService,
  ) {
  }

  async execute(csvFile: string): Promise<string> {
    const csvData = this.cvsService.readFromFile(csvFile)

    if (!csvData.every(d => this.hasMandatoryFields(d))) {
      throw new CardGeneratorError(1, 'Mandatory columns [id, workItemType, parent] not found')
    }

    const PBIs = csvData.filter(this.filterPBIs).map(this.completePBI)
    const tasks = csvData.filter(this.filterTasks).map(this.completeTask)
    const bugs = csvData.filter(this.filterBugs).map(this.completeBug)

    let rows: object[] = []
    rows.push(...PBIs)
    rows.push(...bugs)

    rows = rows.map((data: any) => {
      data.tasks = tasks.filter((t: any) => t.parent === data.id)
      data.taskNumber = data.tasks.length

      return data
    })

    rows.push(...tasks)

    const jsonFile = csvFile.replace('.csv', '.json')

    return this.jsonService.writeFile(jsonFile, {rows})
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
    pbi.iconClass = 'fas fa-folder-open'
    pbi.isPBI = true
    pbi.isTask = false
    pbi.isBug = false
    return pbi
  }

  private filterTasks(task: any) {
    return task.workItemType === 'Task'
  }

  private completeTask(task: any) {
    task.textColor = 'text-warning'
    task.borderColor = 'border-warning'
    task.bgColor = 'bg-warning'
    task.iconClass = 'fas fa-file'
    task.isPBI = false
    task.isTask = true
    task.isBug = false
    return task
  }

  private filterBugs(bug: any) {
    return bug.workItemType === 'Bug'
  }

  private completeBug(bug: any) {
    bug.textColor = 'text-danger'
    bug.borderColor = 'border-danger'
    bug.bgColor = 'bg-danger'
    bug.iconClass = 'fas fa-bug'
    bug.isPBI = false
    bug.isTask = false
    bug.isBug = true
    return bug
  }

}
