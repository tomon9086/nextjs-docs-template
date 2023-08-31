import '@emotion/react'

// Next Config
declare module 'next/config' {
  export = ():
    | {
        serverRuntimeConfig: { [key: string]: string | undefined }
        publicRuntimeConfig: { [key: string]: string | undefined }
      }
    | undefined => {
    // nop
  }
}

// Emotion
declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primary: string
    }
  }
}
