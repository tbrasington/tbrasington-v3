import React from 'react'
import { ColorMode, ThemeProvider, Styled } from 'theme-ui'
import theme from './gatsby-plugin-theme-ui'

export const wrapRootElement = ({ element }) => ( 
    <ThemeProvider theme={theme}>
        <ColorMode />
      <Styled.root>{element}</Styled.root>
    </ThemeProvider> 
)