import { Global, ThemeProvider, css } from '@emotion/react'
import { withThemeFromJSXProvider } from '@storybook/addon-styling'
import type { Preview } from '@storybook/react'
import 'normalize.css'
import React from 'react'
import { theme } from '../src/theme'

const GlobalStyles = () => <Global styles={css``} />

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
}

export const decorators = [
  withThemeFromJSXProvider({
    GlobalStyles
  }),
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  )
]

export default preview
