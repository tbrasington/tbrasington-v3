/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Img from "gatsby-image"
import styled from "@emotion/styled"
import ReactPlayer from "react-player"
import Gallery from "./gallery"
export default ({ data }) => {
  return (() => {
    switch (data.type) {
      case "text":
        return (
          <TextWrapper
            key={data.id}
            sx={{
              variant: "styles",
              py: [3, 5],
            }}
            dangerouslySetInnerHTML={{ __html: data.content.text }}
          />
        )
      case "image":
        return data.childrenMedia.map(media => {
          return media.role === "image" ? (
            <InlineAsset key={data.id}>
              <InlineAssetWrapper>
                <Img fluid={media.media.childImageSharp.fluid} />
              </InlineAssetWrapper>
            </InlineAsset>
          ) : null
        })
      case "video":
        return data.childrenFiles.map(media => {
          return (
            <InlineAsset key={media.file_id}>
              <InlineVideoWrapper>
                <ReactPlayer
                  url={media.file.publicURL}
                  controls={true}
                  loop={true}
                  playing={data.content.autoplay}
                  width="100%"
                  height="100%"
                  className="react-player"
                />
              </InlineVideoWrapper>
            </InlineAsset>
          )
          //return <video url={media.publicURL}></video>
          // console.log(media.file.publicURL)
        })
      case "gallery":
        return (
          <GalleryWrapper
            key={data.id}
            sx={{
              bg: "muted",
              py: [3, 5],
            }}
          >
            <Gallery
              type={data.content.galleryType}
              assets={data.childrenMedia}
            />
          </GalleryWrapper>
        )
      case "mosaic":
        return (
          <InlineAsset key={data.id}>
            <MosaicWrapper>
              {data.childrenBlock.map(block => {
                return (
                  <MosaicBlock key={block.id} columns={block.content.columns}>
                    {block.childrenMedia.map(media => {
                      return (
                        <Img
                          key={media.id}
                          fluid={media.media.childImageSharp.fluid}
                        />
                      )
                    })}
                  </MosaicBlock>
                )
              })}
            </MosaicWrapper>
          </InlineAsset>
        )

      case "card":
        return (
          <CardWrapper
            key={data.id}
            sx={{
              gridColumn:['1 / span 12', data.content.fullwidth ? "1 / span 12" : "span 6"],
              bg: data.content.fullwidth ? "accent" : "transparent",
              py: data.content.fullwidth ? [5, 6] : 0,
              px : [4,0],
              mb: [4, 6],
            }}
           
          >
             <CardContent
              fullwidth={data.content.fullwidth}
              className={
                data.content.fullwidth ? "card-full" : "card-half"
              }>
              <CardAsset fullwidth={data.content.fullwidth} sx={{ mb: [3, 3],   pl : [0,data.content.fullwidth ? 6 : 0]  }}>
                <Img
                  fluid={data.childrenMedia[0].media.childImageSharp.fluid}
                />
              </CardAsset>
              <CardText fullwidth={data.content.fullwidth}>
                <Styled.h5 sx={{mb:3}}>{data.content.title}</Styled.h5>
                <p sx={{ color: "mutedText" }}>
                  {data.content.short_description}
                  {data.content.url.length > 0 && (
                    <a
                      sx={{ color: "mutedText", pt: [3,5] }}
                      href={data.content.url}
                    >
                      Read more
                    </a>
                  )}
                </p>
              </CardText>
            </CardContent>
          </CardWrapper>
        )
      default:
        return null
    }
  })()
}

const Block = styled.div`
  grid-column: 1 / span 12;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`
const InlineAsset = styled.div``
const InlineAssetWrapper = styled.div``

const InlineVideoWrapper = styled.div``

const TextWrapper = styled(Block)`
  grid-column: 2 / span 10;

  h2 {
    grid-column: 1 / span 3;
    margin-bottom: ${props => props.theme.space[2]}px;
    @media (min-width: ${props => props.theme.breakpoints[0]}) {
      margin-bottom: ${props => props.theme.space[4]}px;
    }
  }
  p,
  h3,
  h4,
  h5 {
    grid-column: 4 / span 8;
    margin-bottom: ${props => props.theme.space[2]}px;
    @media (min-width: ${props => props.theme.breakpoints[0]}) {
      margin-bottom: ${props => props.theme.space[4]}px;
    }
  }
`
const GalleryWrapper = styled(Block)`
  div {
    grid-column: 2 / span 10;
  }
`

const MosaicWrapper = styled(InlineAssetWrapper)`
  display: grid;
  grid-gap: ${2 * 2}px;
  grid-row-gap: ${2 * 4}px;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(50px, auto);
  @media (min-width: 1024px) {
    grid-gap: ${2 * 8}px;
    grid-row-gap: ${2 * 16}px;
    grid-template-columns: repeat(12, 1fr);
  }
`
const MosaicBlock = styled.div`
  grid-column: auto / span 2;
  display: flex;
  .gatsby-image-wrapper {
    flex: 1;
    align-self: flex-end;
  }
`

const CardWrapper = styled(Block)`

div  {

  grid-column: 1 / span 12;
}
@media (min-width: ${props => props.theme.breakpoints[0]}) {
  .card-full  {
    grid-column:  2 / span 10;
  }
  .card-half  {
    grid-column: 3 / span 9;
  }
  
  & + & > .card-half  {
    grid-column: 2 / span 9;
  }
}
`
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
