import fs from 'fs'
import { promisify } from 'util'
import { HISTORY_PATH, SESSIONS_PATH } from './filepaths'

const writeFile = promisify(fs.writeFile)

export default async (type, data) => {
  if (type === 'history') {
    await writeFile(HISTORY_PATH, JSON.stringify(data)).catch(console.error)
  } else if (type === 'session') {
    await writeFile(SESSIONS_PATH, JSON.stringify(data)).catch(console.error)
  }
}
