/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Img from "gatsby-image"
import styled from "@emotion/styled"
import ReactPlayer from "react-player"
import Gallery from "./gallery"
import Card from "./card"
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
 
          return media.type === "image" ? (
            <InlineAsset key={data.id} sx={{width : (data.content.imageSize===2 ? '50%':'100%')}}>
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
              py: [4, 5],
            }}
          >
            {data.content.title && (
              <Block>
                <Styled.h2 sx={{ color: "backgroundText", mb: [3, 4] }}>
                  {data.content.title}
                </Styled.h2>
              </Block>
            )}
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
              gridColumn: [
                "1 / span 12",
                data.content.fullwidth ? "1 / span 12" : "span 6",
              ],
              bg: data.content.fullwidth ? "accent" : "transparent",
              py: data.content.fullwidth ? [5, 6] : 0,
              px: [4, 0],
              mb: [4, 6],
            }}
          >
            <Card data={data} />
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
  h2 {
    grid-column: 2 / span 10;
    margin-bottom: ${props => props.theme.space[3]}px;
    @media (min-width: ${props => props.theme.breakpoints[0]}) {
      grid-column: 2 / span 3;
      margin-bottom: ${props => props.theme.space[4]}px;
    }
    @media (min-width: ${props => props.theme.breakpoints[0]}) {
      grid-column: 2 / span 2;
    }
  }
  p,
  h3,
  h4,
  h5 {
    grid-column: 2 / span 10;
    margin-bottom: ${props => props.theme.space[2]}px;

    @media (min-width: ${props => props.theme.breakpoints[0]}) {
      grid-column: 5 / span 6;
      margin-bottom: ${props => props.theme.space[4]}px;
    }

    @media (min-width: ${props => props.theme.breakpoints[1]}) {
      grid-column: 4 / span 6;
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
  div {
    grid-column: 1 / span 12;
  }
  @media (min-width: ${props => props.theme.breakpoints[0]}) {
    .card-full {
      grid-column: 2 / span 10;
    }
    .card-half {
      grid-column: 3 / span 9;
    }

    & + & > .card-half {
      grid-column: 2 / span 9;
    }
  }
`
