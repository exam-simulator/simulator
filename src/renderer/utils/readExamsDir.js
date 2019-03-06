import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import { EXAM_DIR_PATH } from './filepaths'

const readDir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
const getStats = promisify(fs.stat)

/**
 * Read exams directory, parse all exam JSON files, return array of exam objects
 */
export default async () => {
  const filenames = await readDir(EXAM_DIR_PATH)
  const examData = filenames.map(file => readFile(path.join(EXAM_DIR_PATH, file)))
  const statsData = filenames.map(file => getStats(path.join(EXAM_DIR_PATH, file)))
  const resolved = await Promise.all([examData, statsData].map(el => Promise.all(el)))
  return resolved[0]
    .map(el => JSON.parse(el))
    .map((el, i) => {
      el.stats = resolved[1][i]
      el.filename = filenames[i]
      return el
    })
}
