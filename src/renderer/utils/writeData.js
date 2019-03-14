import fs from 'fs'
import { promisify } from 'util'
import { HISTORY_PATH, SESSIONS_PATH, EXAM_DIR_PATH } from './filepaths'

const writeFile = promisify(fs.writeFile)

export default async (type, data, filename) => {
  if (type === 'history') {
    await writeFile(HISTORY_PATH, JSON.stringify(data)).catch(console.error)
  } else if (type === 'session') {
    await writeFile(SESSIONS_PATH, JSON.stringify(data)).catch(console.error)
  } else if (type === 'exam') {
    await writeFile(`${EXAM_DIR_PATH}/${filename}`, JSON.stringify(data)).catch(console.error)
  }
}
