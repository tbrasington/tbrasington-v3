/** @jsx jsx */

import PropTypes from "prop-types"
import { Link } from "gatsby"
import { jsx, useColorMode, Layout, Header, Main, Footer, Box } from "theme-ui"
import "./layout.css"
import { nameSpacedColours } from "../gatsby-plugin-theme-ui"
import ColourModeIcon from "../images/colourMode.svg"
const SiteWrapper = ({ children }) => {
  const [mode, setMode] = useColorMode()
  const toggleMode = e => {
    setMode(mode === "dark" ? "light" : "dark")
  }

  const NetWorkLinks = [
    {
      name: "Github",
      url: "https://github.com/tbrasington",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/tbrasington",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/tbrasington",
    },
    {
      name: "LinkedIn",
      url: "https://uk.linkedin.com/in/thomasbrasington",
    },
  ]

  return (
    <Layout>
      <Header
        sx={{
          height: ["96px", "128px"],
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [3, 4],
        }}
      >
        <ColourModeIcon
          onClick={toggleMode}
          css={`
            transition: all 0.3s ease;
            transform: rotate(${mode === "dark" ? "180" : "0"}deg);
            transform-origin: center;
            cursor: pointer;
            #ColourModeIcon {
              stroke: ${mode === "dark"
                ? nameSpacedColours.black
                : nameSpacedColours.offWhite};
            }
          `}
        />
        <h1
          sx={{
            fontFamily: "heading",
            fontSize: [5, 6],
            fontWeight: "heading",
            lineHeight: 1,
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Link to="/" sx={{ textDecoration: "none", color: "text" }}>
            Thomas
            <br />
            Brasington
          </Link>
        </h1>
      </Header>

      <Main>{children}</Main>

      <Footer sx={{ fontSize: 2 }}>
        <Box sx={{ gridColumn: "2  / span 12", mb: 3 }}>
          {NetWorkLinks.map(NetWorkLink => {
            return (
              <a
                key={NetWorkLink.url}
                sx={{ color: "text", mr: 3, textDecoration: "none" }}
                target="_blank"
                rel="noopener noreferrer"
                href={NetWorkLink.url}
              >
                {NetWorkLink.name}
              </a>
            )
          })}
        </Box>
        <Box sx={{ gridColumn: "2  / span 12" }}>&copy; Thomas Brasington 2006 &ndash; { new Date().getFullYear()}</Box>
      </Footer>
    </Layout>
  )
}

SiteWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SiteWrapper
