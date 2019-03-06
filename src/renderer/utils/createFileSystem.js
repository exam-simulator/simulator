import fs from 'fs'
import { promisify } from 'util'
import * as filepaths from './filepaths'

const mkdir = promisify(fs.mkdir)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

/**
 * Create directories and files to store application data
 */
export default async () => {
  await mkdir(filepaths.DATA_DIR_PATH)

  await mkdir(filepaths.EXAM_DIR_PATH)

  const optionsData = await readFile(filepaths.OPTIONS_SRC_PATH)
  await writeFile(filepaths.OPTIONS_DST_PATH, optionsData)

  const demoExamData = await readFile(filepaths.DEMO_SRC_PATH)
  await writeFile(filepaths.DEMO_DST_PATH, demoExamData)

  await writeFile(filepaths.HISTORY_PATH, JSON.stringify([]))

  await writeFile(filepaths.SESSIONS_PATH, JSON.stringify([]))
}
