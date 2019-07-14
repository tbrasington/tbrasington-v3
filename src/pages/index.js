import React from "react"
import { graphql } from "gatsby"
import SiteWrapper from "../components/SiteWrapper"
import SEO from "../components/seo"
import renderBlocks from "../components/blocks"

export const query = graphql`
{
  pages(isHomepage: {eq: 1}) {
    id
    title
    childrenBlock {
      id
      type
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
        pivot {
          metadatas 
        }
        role
      }
    }
  }
}
`
const IndexPage = ({data}) => {
  return(
  <SiteWrapper>
    <SEO title="Home" />
    
    {data.pages.childrenBlock.map(block => {
      return renderBlocks({ data: block })
    })}
   </SiteWrapper>
)
}
export default IndexPage
