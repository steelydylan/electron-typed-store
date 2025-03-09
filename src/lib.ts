import fs from 'fs'

export async function pathExists(filePath: string): Promise<boolean> {
  try {
    await fs
      .promises
      .access(filePath)
    return true
  } catch {
    return false
  }
}

export async function readJson(filePath: string): Promise<any> {
  const data = await fs.promises.readFile(filePath, 'utf8')
  return JSON.parse(data.toString())
}

export async function writeJson(filePath: string, data: any): Promise<void> {
  await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2))
}
