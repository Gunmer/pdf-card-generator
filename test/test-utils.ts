import * as fs from 'fs'

// tslint:disable-next-line:no-unnecessary-class
export class TestUtils {
  static deleteDirIfExist(dir: string) {
    if (fs.existsSync(dir)) {
      fs.rmdirSync(dir)
    }
  }

  static deleteFileIfExist(file: string) {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file)
    }
  }
}
