/** @jsx jsx */

import PropTypes from "prop-types"
import { Link } from "gatsby"
import { jsx, useColorMode, Layout, Header, Main } from "theme-ui"
import { config } from "react-spring"
import { Transition } from "react-spring/renderprops"
import {smallScreen} from '../utils'
// theme and css
import "./layout.css"
import { nameSpacedColours } from "../gatsby-plugin-theme-ui"
import ColourModeIcon from "../images/colourMode.svg"

// components
import { SmallScreenMenu, LargeScreenMenu, FooterContent } from "./navigation"

// colour mode function
const SiteWrapper = ({ children }) => {
  const [mode, setMode] = useColorMode()
  const toggleMode = e => {
    setMode(mode === "dark" ? "light" : "dark")
  }

  return (
    <Layout>
      {smallScreen() && <SmallScreenMenu />}
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

          {!smallScreen() && <LargeScreenMenu />}

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

      <Transition
        config={config.slow}
        from={{ opacity: 0, transform: "translate3d(0%,10%,0)" }}
        enter={{ opacity: 1, transform: "translate3d(0%,0,0)" }}
        leave={{ opacity: 0, transform: "translate3d(0%,-10%,0)" }}
      >
        {() => style => <Main style={style}>{children} </Main>}
      </Transition>

      <FooterContent />
    </Layout>
  )
}

SiteWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SiteWrapper
