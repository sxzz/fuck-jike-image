import { writeFile } from 'fs/promises'
// @ts-expect-error
import steggy from 'steggy'
import undici from 'undici'

const uploadedImage = await undici
  .fetch(process.argv[2])
  .then((r) => r.arrayBuffer())
const revealed = steggy.reveal()(Buffer.from(uploadedImage))
await writeFile('./playground/revealed.png', revealed)
