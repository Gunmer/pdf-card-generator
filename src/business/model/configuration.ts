export interface Configuration {
  rootFolder: string
  resFolder: Resource
  tempFolder: string
}

interface Resource {
  folder: string
  style: string
  image: string
  template: string
}
