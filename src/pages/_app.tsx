import store from '@/store'
import { theme } from '@/theme'
import { Global, ThemeProvider, css } from '@emotion/react'
import { AppProps } from 'next/app'
import 'normalize.css'
import { Provider } from 'react-redux'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <Global
          styles={css`
            html,
            body {
              padding: 0;
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                sans-serif;
            }

            a {
              color: inherit;
              text-decoration: none;
            }

            * {
              box-sizing: border-box;
            }
          `}
        />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
