import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"

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
    }
  }
`

const Project = ({ data }) => {
  const project = data.projects;
  
  return (
    <div>
      <h1>{project.title}</h1>
      <Image
        fluid={project.childrenMedia[0].media.childImageSharp.fluid}
        alt={project.title}
        style={{ float: "left", marginRight: "1rem", width: "100%" }}
      />
      <p>{project.short_description}</p>
      <div dangerouslySetInnerHTML={{ __html: project.description }} />
    </div>
  )
}

export default Project