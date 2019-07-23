/** @jsx jsx */

import { graphql } from "gatsby"
import Image from "gatsby-image"
import { Styled,  jsx } from "theme-ui"
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
        role
        alt_text
      }
      childrenBlock {
        id
        type
        content {
          text
          galleryType
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
          role
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
const Container  = styled.div`
grid-column: 1 / span 12;
`

const BlockBox = styled.div`
width:100%;
`


const Project = ({ data }) => {
  const project = data.projects

  return (
    <SiteWrapper>
      <SEO title={project.title} />

      <Container>
      <Image
        fluid={project.childrenMedia[0].media.childImageSharp.fluid}
        alt={project.title}
        style={{ float: "left", marginRight: "1rem", width: "100%" }}
      />

      <Styled.h1 sx={{textAlign:'center'}}>{project.title}</Styled.h1>

      <p sx={{}}>{project.description}</p>
         {project.childrenBlock.map(block => {
          return renderBlocks({ data: block })
        })}
      </Container>
    </SiteWrapper>
  )
}

export default Project
