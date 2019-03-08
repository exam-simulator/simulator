import fs from 'fs'
import { promisify } from 'util'

const deleteFile = promisify(fs.unlink)

export default async filepath => {
  await deleteFile(filepath)
}
