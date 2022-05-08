import fs from 'fs/promises'
import { JikeClient } from 'jike-sdk'
import Md5 from 'md5'
// @ts-expect-error
import steggy from 'steggy'
import undici from 'undici'
import { getConfigFromCLI } from './util'
export const foo = 'foo'

const config = await getConfigFromCLI()
const client = JikeClient.fromJSON(config.users[0])
main()

async function main() {
  const cover = await fs.readFile('playground/cover.png')
  const target = await fs.readFile('playground/target.jpg')

  const result = steggy.conceal()(cover, target)
  await fs.writeFile('./playground/result.png', result)

  const tokenRes = await client.apiClient.upload.token(Md5(result))
  const { uptoken } = tokenRes.data

  const response = await client.apiClient.upload.upload(result, uptoken)

  const uploadedImage = await undici
    .fetch(response.fileUrl)
    .then((r) => r.arrayBuffer())
  const revealed = steggy.reveal()(Buffer.from(uploadedImage))
  await fs.writeFile('./playground/data.png', revealed)
}
