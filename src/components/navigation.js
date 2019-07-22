/** @jsx jsx */
import { useState } from "react"
import { Link as GatsbyLink } from "gatsby"
import { jsx, Box, Footer } from "theme-ui"
import { TransitionPortal } from "gatsby-plugin-transition-link"
import { useTransition, animated } from "react-spring"
import { nameSpacedColours } from "../gatsby-plugin-theme-ui"

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
const SiteLinks = [
  {
    name: "Work",
    url: "/",
  },
  {
    name: "Photography",
    url: "/photography",
  },
  {
    name: "Boneyard",
    url: "/boneyard",
  },
]

const Link = ({ children, to, activeClassName, partiallyActive, ...other }) => {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  const internal = /^\/(?!\/)/.test(to)
  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
    return (
      <GatsbyLink
        to={to}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        {...other}
      >
        {children}
      </GatsbyLink>
    )
  }
  return (
    <a href={to} target="_blank" rel="noopener noreferrer" {...other}>
      {children}
    </a>
  )
}

export const renderLinks = (linkData, styles) => {
  return linkData.map(linkItem => {
    return (
      <Link
        key={linkItem.url}
        to={linkItem.url}
        sx={{ color: "inherit", textDecoration: "none",  ...styles }}
      >
        {linkItem.name}
      </Link>
    )
  })
}

export const LargeScreenMenu = () => {
  return (
    <div
      sx={{
        height: "48px",
        alignItems: "center",
        justifyContent: "flex-start",
        display: "flex",
        fontSize: 2,
        px:4
      }}
    >
      {renderLinks(SiteLinks, { mb: 0, mr: 3 })}
    </div>
  )
}

export const SmallScreenMenu = () => {
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
  return (
    <TransitionPortal>
      <div
        sx={{
          zIndex: 1200,
          backgroundColor: "primary",
          position: "fixed",
          width: "48px",
          height: "48px",
          borderRadius: "48px",
          bottom: 3,
          right: 3,
          fontSize: 1,
          lineHeight: "0px",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          color: nameSpacedColours.offWhite,
        }}
        onClick={() => set(!show)}
      >
        <span sx={{ cursor: "pointer" }}>{!show ? "Menu" : "Close"}</span>
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
                  pb: 6,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {renderLinks(SiteLinks)}
              </div>
            </animated.div>
          )
      )}
    </TransitionPortal>
  )
}

export const FooterContent = () => (
  <Footer sx={{ fontSize: 2 }}>
    <Box sx={{ gridColumn: "2  / span 12", mb: 3 }}>
      {renderLinks(NetWorkLinks, { mr: 3 })}
    </Box>
    <Box sx={{ gridColumn: "2  / span 12" }}>
      &copy; Thomas Brasington 2006 &ndash; {new Date().getFullYear()}
    </Box>
  </Footer>
)
