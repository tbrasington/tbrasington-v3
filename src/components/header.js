/** @jsx jsx */
import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import { jsx, Box } from "theme-ui"

const Header = ({ siteTitle }) => (
  <Box
    sx={{
      color: "white",
      bg: "primary",
      fontSize: 4,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </Box>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
