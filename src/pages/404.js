/** @jsx jsx */
import { Link } from "gatsby"
import { jsx, Styled, Box } from "theme-ui"
import SiteWrapper from "../components/SiteWrapper"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <SiteWrapper>
    <SEO title="404: Not found" />
    <Box
      sx={{
        gridColumn: "2 / span 10",
        py: [3, 5],
      }}
    >
      <Styled.h1>404</Styled.h1>
      <Styled.p>
        This page doesn't exist.{" "}
        <Link sx={{ color: "text" }} to="/">
          Return back home.
        </Link>
      </Styled.p>
    </Box>
  </SiteWrapper>
)

export default NotFoundPage
