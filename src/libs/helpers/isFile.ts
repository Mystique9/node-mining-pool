import * as fs from 'fs'

import log from './log'

export default function isFile(filePath: string): boolean {
  try {
    fs.accessSync(filePath)
    return true
  }
  catch (err) {
    log.error(`${err}`)
    return false
  }
}
