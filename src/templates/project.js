/** @jsx jsx */

import { graphql } from "gatsby"
import Image from "gatsby-image"
import { Styled, jsx } from "theme-ui"
import styled from "@emotion/styled"
import SiteWrapper from "../components/SiteWrapper"
import SEO from "../components/seo"
import renderBlocks from "../components/blocks"

export const query = graphql`
  query($slug: String!) {
    projects(slug: { eq: $slug }) {
      title
      short_description
      description
      childrenMedia {
        id
        media {
          childImageSharp {
            fluid(maxWidth: 3000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        
        alt_text
      }
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

const Project = ({ data }) => {
  const project = data.projects
  return (
    <SiteWrapper>
      <SEO title={project.title} />

      <Container>
        {project.childrenMedia !==undefined && project.childrenMedia.length > 0 && (
          <Image
            fluid={project.childrenMedia[0].media.childImageSharp.fluid}
            alt={project.title}
            sx={{ float: "left", width: "100%", gridColumn : 'span 12' }}
          />
        )}

        <Styled.h1 sx={{ gridColumn : ['2 / span 4','2 / span 8','4 / span 6','4 / span 6'], mt:[4,5]}}>{project.title}</Styled.h1>

        <Styled.h4 sx={{ gridColumn : ['2 / span 8','2 / span 8', '4 / span 8', '4 / span 6'  ], mt:[4,5]}}>{project.description}</Styled.h4>

        {project.childrenBlock.map(block => {
          return renderBlocks({ data: block })
        })}
      </Container>
    </SiteWrapper>
  )
}

export default Project
