import React from "react"
import { Link } from "gatsby"

import SiteWrapper from "../components/SiteWrapper"
import SEO from "../components/seo"

const SecondPage = () => (
  <SiteWrapper>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </SiteWrapper>
)

export default SecondPage
