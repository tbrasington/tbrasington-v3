/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Img from "gatsby-image"
import styled from "@emotion/styled"

const CardContent = styled.div`
  @media (min-width: ${props => props.theme.breakpoints[0]}) {
    display: flex;
    flex-direction: ${props => (props.fullwidth ? "row-reverse" : "column")};
  }
`
const CardAsset = styled.div`
  @media (min-width: ${props => props.theme.breakpoints[0]}) {
    width: ${props => (props.fullwidth ? "50%" : "100%")};
  }
`
const CardText = styled.div`
  @media (min-width: ${props => props.theme.breakpoints[0]}) {
    display: flex;
    flex-direction: column;
    width: ${props => (props.fullwidth ? "50%" : "100%")};
    justify-content: ${props => (props.fullwidth ? "center" : "flex-start")};
  }

  a {
    display: block;
    text-decoration: none;
  }

  a:hover {
    color: ${props => props.theme.colors.hover};
  }
`

export default ({ data }) => {
  return (
    <CardContent
      fullwidth={data.content.fullwidth}
      className={data.content.fullwidth ? "card-full" : "card-half"}
    >
      <CardAsset
        fullwidth={data.content.fullwidth}
        sx={{
          mb: data.content.fullwidth ? [4, 0] : [3, 3],
          pl: [0, data.content.fullwidth ? 6 : 0],
        }}
      >
        <Img fluid={data.childrenMedia[0].media.childImageSharp.fluid} />
      </CardAsset>
      <CardText fullwidth={data.content.fullwidth}>
        <Styled.h5 sx={{ mb: [2, 3] }}>{data.content.title}</Styled.h5>
        <p sx={{ color: "mutedText" }}>
          {data.content.short_description && data.content.short_description}
          {data.content.url && data.content.url.length > 0 && (
            <a sx={{ color: "mutedText", pt: [3, 5] }} href={data.content.url}>
              Read more
            </a>
          )}
        </p>
      </CardText>
    </CardContent>
  )
}
