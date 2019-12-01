import * as path from 'path'

// tslint:disable-next-line:no-unnecessary-class
export class Fixtures {
  static getResources(append?: string) {
    if (append) {
      return path.resolve(__dirname, './resources', append)
    }
    return path.resolve(__dirname, './resources')
  }
}
