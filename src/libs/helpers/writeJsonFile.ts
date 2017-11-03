import * as fs from 'fs'

function deepJsonStringify(data: Object, indentation: number): string {
  const cache = []

  return JSON.stringify(data, (key: string, value: any) => {
    if (typeof value === 'object' && value !== null) {
      // Circular reference found, discard key
      if (cache.indexOf(value) !== -1) return

      // Store value in our collection
      cache.push(value)
    }

    return value
  }, indentation)
}

export default function writeJsonFile(filePath: string, data: Object): void {
  fs.writeFileSync(filePath, deepJsonStringify(data, 2))
}
