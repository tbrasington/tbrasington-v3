/** @jsx jsx */

import { graphql } from "gatsby"
import { Styled, jsx ,Box} from "theme-ui"
import styled from "@emotion/styled"
import SiteWrapper from "../components/SiteWrapper"
import SEO from "../components/seo"
import renderBlocks from "../components/blocks"

export const query = graphql`
  query($slug: String!) {
    pages(slug: { eq: $slug }) {
      title
      description

      childrenBlock {
        id
        type
        content {
          text
          galleryType
          imageSize
          url
          title
          fullwidth
          short_description
        }
        childrenBlock {
          id
          blockable_id
          content {
            columns
            imageSize
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
          }
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
          type
          alt_text

          pivot {
            metadatas
          }
        }
      }
    }
  }
`
const Container = styled.div`
  grid-column: 1 / span 12;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`

const page = ({ data }) => {
  const page = data.pages

  return (
    <SiteWrapper>
      <SEO title={page.title} />

      <Box
      sx={{
        gridColumn: "2 / span 10",
        py: [3, 5],
      }}
    >
     <Styled.h1
          sx={{
            gridColumn: [
              "2 / span 4",
              "2 / span 8",
              "4 / span 4",
              "4 / span 4",
            ],
          }}
        >
          {page.title}
        </Styled.h1>

        <Styled.p
          sx={{
            gridColumn: [
              "2 / span 8",
              "2 / span 8",
              "4 / span 8",
              "4 / span 6",
            ],
            mt: [2,3],
          }}
        >
          {page.description}
        </Styled.p>
    </Box>

      <Container>
       

        {page.childrenBlock.map(block => {
          return renderBlocks({ data: block })
        })}
      </Container>
    </SiteWrapper>
  )
}

export default page
