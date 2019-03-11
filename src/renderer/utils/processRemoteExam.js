import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import validateExam from './validateExam'
import { EXAM_DIR_PATH } from './filepaths'

const writeFile = promisify(fs.writeFile)

export default (filename, exam) => {
  return new Promise(async (resolve, reject) => {
    const dstFilepath = path.join(EXAM_DIR_PATH, filename)
    const data = JSON.stringify(exam)
    const valid = await validateExam(data)
    if (valid === 'valid') {
      await writeFile(dstFilepath, data)
      resolve(true)
    } else {
      const errors = valid.map(el => el.message)
      resolve(errors)
    }
  })
}
