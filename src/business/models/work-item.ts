export interface WorkItem {
  id: string
  workItemType: string
  parent: string
  title: string
  state?: string
  effort?: string
  remainingWork?: string
  assignedTo?: string
}
