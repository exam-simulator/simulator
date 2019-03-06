import fs from 'fs'
import { promisify } from 'util'
import { HISTORY_PATH } from './filepaths'

const readFile = promisify(fs.readFile)

/**
 * Read history.json, parse, return array of history objects
 */
export default async () => {
  const data = await readFile(HISTORY_PATH)
  return data.length ? JSON.parse(data) : []
}
