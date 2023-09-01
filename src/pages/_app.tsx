import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import 'normalize.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
