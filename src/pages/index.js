import React from "react"
import { Link,graphql } from "gatsby"

import SiteWrapper from "../components/SiteWrapper"
import Image from "../components/image"
import SEO from "../components/seo"

export const query = graphql`
{
  pages(isHomepage: {eq: 1}) {
    id
    title
    childrenBlock {
      id
      content {
        text
        galleryType
      }
      childrenMedia {
        id
        media {
          childImageSharp {
            fluid(maxWidth: 3000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        role
        alt_text
      }
    }
  }
}
`
const IndexPage = ({data}) => {
  console.log(data.pages)
  return(
  <SiteWrapper>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </SiteWrapper>
)
}
export default IndexPage
