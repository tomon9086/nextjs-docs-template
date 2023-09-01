import { Buffer } from 'buffer'

export const decodeBase64 = (base64: string) => {
  const decoded = Buffer.from(base64, 'base64').toString()

  try {
    return JSON.parse(decoded)
  } catch (err) {
    return decoded
  }
}
