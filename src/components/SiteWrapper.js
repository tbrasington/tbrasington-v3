/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import { jsx, useColorMode, Layout, Header, Main, Container } from 'theme-ui'
 
const SiteWrapper = ({ children }) => {
  
  const [mode, setMode] = useColorMode()
  const toggleMode = e => {
    setMode(mode === 'dark' ? 'light' : 'dark')
  }
 
  return ( 
    <Layout>
       
      <Header
        css={{
          p: 4,
        }}
      >
        <button title="Toggle Dark Mode" onClick={toggleMode}>
          {mode}
        </button>
      </Header>
      <Main>
        <Container>{children}</Container>
      </Main>
    </Layout> 
  )
}
 
SiteWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SiteWrapper
