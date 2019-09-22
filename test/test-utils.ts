import * as fs from 'fs'

class TestUtils {
  // noinspection JSMethodCanBeStatic
  deleteDirIfExist(dir: string) {
    if (fs.existsSync(dir)) {
      fs.rmdirSync(dir)
    }
  }

  // noinspection JSMethodCanBeStatic
  deleteFileIfExist(file: string) {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file)
    }
  }
}

const testUtils = new TestUtils()
export default testUtils
