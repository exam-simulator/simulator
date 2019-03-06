import fs from 'fs'
import { promisify } from 'util'
import { OPTIONS_DST_PATH } from './filepaths'

const readFile = promisify(fs.readFile)

/**
 * Read options.json, parse, return options objects
 */
export default async () => {
  const data = await readFile(OPTIONS_DST_PATH)
  return JSON.parse(data)
}
