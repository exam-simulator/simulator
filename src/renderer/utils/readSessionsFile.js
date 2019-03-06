import fs from 'fs'
import { promisify } from 'util'
import { SESSIONS_PATH } from './filepaths'

const readFile = promisify(fs.readFile)

/**
 * Read sessions.json, parse, return array of history objects
 */
export default async () => {
  const data = await readFile(SESSIONS_PATH)
  return data.length ? JSON.parse(data) : []
}
