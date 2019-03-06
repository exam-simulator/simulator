import { remote } from 'electron'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import validateExam from './validateExam'
import { EXAM_DIR_PATH } from './filepaths'

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

/**
 * Show native file dialog then parse and validate JSON file
 * @param {object} win - Instance of electron BrowserWindow
 */
export default win => {
  return new Promise((resolve, reject) => {
    remote.dialog.showOpenDialog(
      win,
      {
        title: 'Load Local Exam File',
        filters: [{ name: 'JSON', extensions: ['json'] }],
        properties: ['openFile'],
        buttonLabel: 'Load Exam'
      },
      async filepaths => {
        // user clicked 'cancel'
        if (!filepaths) {
          resolve(false)
        } else {
          // isolate filename from path
          const filename = filepaths[0].split('\\').pop()
          // path to application data directory
          const dstFilepath = path.join(EXAM_DIR_PATH, filename)
          // read contents of new exam file
          const data = await readFile(filepaths[0])
          // validate JSON against predefined schema
          const valid = validateExam(data)
          // exam is valid so write it to application data
          if (valid === 'valid') {
            await writeFile(dstFilepath, data)
            resolve(true)
            // exam is not valid return error messages
          } else {
            const errors = valid.map(el => el.message)
            resolve(errors)
          }
        }
      }
    )
  })
}
