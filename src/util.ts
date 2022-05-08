import { readFile } from 'fs/promises'
import { homedir } from 'os'
import path from 'path'

export const getConfigFromCLI = async () =>
  JSON.parse(
    await readFile(
      path.resolve(homedir(), '.config/jike-cli/config.json'),
      'utf-8'
    )
  )
