import { NextRequest, NextResponse } from 'next/server'
import { decodeBase64 } from './util/base64'

export const config = {
  matchers: ['/', '/index']
}

export const middleware = (req: NextRequest) => {
  if (process.env.NODE_ENV !== 'production') {
    return NextResponse.next()
  }

  const basicAuth = req.headers.get('authorization')

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, password] = decodeBase64(authValue).split(':')

    if (user === 'osk_web' && password === 'qySFxxUiGdQJTww') {
      return NextResponse.next()
    }
  }

  return new NextResponse('Auth Required.', {
    status: 401,
    headers: {
      'WWW-authenticate': 'Basic realm="Secure Area"'
    }
  })
}
