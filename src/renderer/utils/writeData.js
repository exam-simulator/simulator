import fs from 'fs'
import { promisify } from 'util'
import { HISTORY_PATH } from './filepaths'

const writeFile = promisify(fs.writeFile)

export default (type, data) => {
  if (type === 'history') {
    writeFile(HISTORY_PATH, JSON.stringify(data)).catch(console.error)
  }
}
