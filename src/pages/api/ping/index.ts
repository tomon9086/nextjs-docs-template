import { handler } from '@/api/handler'

export default handler().get((_, res) => {
  res.send('pong')
})
