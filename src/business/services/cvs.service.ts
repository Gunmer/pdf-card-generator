import {WorkItem} from '../models/work-item'

export interface CvsService {
  readFromFile(filePath: string): object[]
  readAndProcessFile(filePath: string): any[]
  parseWorkItems(csvFile: string): WorkItem[]
}
