import * as fs from 'fs'

import { logError } from './log'

export default function isFile(filePath: string): boolean {
  try {
    fs.accessSync(filePath)
    return true
  }
  catch (err) {
    logError(`${err}`)
    return false
  }
}
