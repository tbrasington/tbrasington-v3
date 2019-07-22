/** @jsx jsx */
import React, { useState } from "react"

import PropTypes from "prop-types"
import { Link } from "gatsby"
import { jsx, useColorMode, Layout, Header, Main, Footer, Box } from "theme-ui"
import { TransitionPortal } from "gatsby-plugin-transition-link"
import { useTransition, config, animated } from "react-spring"
import { Transition } from "react-spring/renderprops"

// theme and css
import "./layout.css"
import { nameSpacedColours } from "../gatsby-plugin-theme-ui"
import ColourModeIcon from "../images/colourMode.svg"

// colour mode function
const SiteWrapper = ({ children }) => {
  const [mode, setMode] = useColorMode()
  const toggleMode = e => {
    setMode(mode === "dark" ? "light" : "dark")
  }

  // showing the menu modal
  const [show, set] = useState(false)
  const transitions = useTransition(show, null, {
    from: {
      position: "absolute",
      transform: "translate3d(0,100%,0)",
      opacity: 0,
    },
    enter: { opacity: 1, transform: "translate3d(0%,0%,0)" },
    leave: { opacity: 0, transform: "translate3d(0%,50%,0)" },
  })

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
  // probably should be a json object from the cms
  const MenuLinks = () => (
    <React.Fragment>
      <Link sx={{ color: "text", mb: 3, textDecoration: "none" }} to="/">
        Work
      </Link>
      <Link
        sx={{ color: "text", mb: 3, textDecoration: "none" }}
        to="/photography"
      >
        Photography
      </Link>{" "}
      <Link
        sx={{ color: "text", mb: 3, textDecoration: "none" }}
        to="/boneyard"
      >
        Boneyard
      </Link>
    </React.Fragment>
  )

  return (
    <Layout>
      <TransitionPortal>
        <div
          sx={{
            zIndex: 1200,
            backgroundColor: "primary",
            position: "fixed",
            width: "40px",
            height: "40px",
            borderRadius: "40px",
            bottom: 3,
            right: 3,
            fontSize: 0,
            lineHeight: "0px",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
          onClick={() => set(!show)}
        >
          <span>{!show ? "Menu" : "Close"}</span>
        </div>

        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div
                key={key}
                style={props}
                sx={{
                  width: "100vw",
                  height: "100vh",
                }}
              >
                <div
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    backgroundColor: "primary",
                    width: "100%",
                    height: "auto",
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {MenuLinks()}
                </div>
              </animated.div>
            )
        )}
      </TransitionPortal>

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

      <Transition
        config={config.slow}
        from={{ opacity: 0, transform : 'translate3d(0%,10%,0)' }}
        enter={{ opacity: 1,transform : 'translate3d(0%,0,0)' }}
        leave={{ opacity: 0 ,transform : 'translate3d(0%,-10%,0)'}}
      >
        {() => style => <Main style={style}>{children} </Main>}
      </Transition>

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
        <Box sx={{ gridColumn: "2  / span 12" }}>
          &copy; Thomas Brasington 2006 &ndash; {new Date().getFullYear()}
        </Box>
      </Footer>
    </Layout>
  )
}

SiteWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SiteWrapper
