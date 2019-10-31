import * as parse from 'csv-parse/lib/sync'
import * as fs from 'fs'
import {injectable} from 'inversify'

import {CvsService} from '../business/services/cvs.service'

@injectable()
export class CvsParseService implements CvsService {
  readFromFile(filePath: string): object[] {
    const cvsFile = fs.readFileSync(filePath)
    return parse(cvsFile, {
      columns: h => this.formatHeaders(h),
      skip_empty_lines: true
    })
  }

  readAndProcessFile(filePath: string): any[] {
    const csvData = this.readFromFile(filePath)

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

    return rows
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

  private formatHeaders(headers: string[]) {
    return headers.map(row => this.toLowerCamelCase(row))
  }

  private toLowerCamelCase(header: string): string {
    const headerUpperCamelCase = header.trim()
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase())
      .join('')
    return headerUpperCamelCase.charAt(0).toLowerCase() + headerUpperCamelCase.substring(1)
  }
}
