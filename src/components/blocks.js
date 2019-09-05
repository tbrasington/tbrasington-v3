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
            <InlineAssetWrapper
              key={data.id}
              fullBleed={data.content.imageSize}
            >
              <Img fluid={media.media.childImageSharp.fluid} />
            </InlineAssetWrapper>
          ) : null
        })
      case "video":
        return data.childrenFiles.map(media => {
          return (
            <InlineVideoWrapper key={media.file_id}>
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
          <Block key={data.id}>
            {data.childrenBlock.map(block => {
              return (
                <MosaicBlock
                  key={data.id +block.id}
                  sx={{
                    gridColumn: `span ${block.content.columns}`,
                    px : (block.content.imageSize ===2  ? [3,5] : 0),
                    py : (block.content.imageSize ===2  ? [3,5]:0)
                  }}
                >
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
          </Block>
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

const InlineAssetWrapper = styled(Block)`
  background-color: ${props => props.theme.colors.lightGrey};
  padding: ${props => (props.fullBleed === 2 ? `${props.theme.space[5]}px` : 0)}
    0;
  div {
    grid-column: ${props =>
      props.fullBleed === 2 ? "4 / span 6" : "1 / span 12"};
  }
`
const InlineVideoWrapper = styled.div``

const TextWrapper = styled(Block)`
  h2 {
    grid-column: 2 / span 10;
    margin-bottom: ${props => props.theme.space[3]}px;

    @media (min-width: ${props => props.theme.breakpoints[0]}) {
      grid-column: 2 / span 3;
      margin-bottom: ${props => props.theme.space[4]}px;
    }
    
    @media (min-width: ${props => props.theme.breakpoints[1]}) {
      grid-column: 2 / span 2;
    }
    @media (min-width: ${props => props.theme.breakpoints[2]}) {
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
      grid-column: 2 / span 8;
      margin-bottom: ${props => props.theme.space[4]}px;
    }
    @media (min-width: ${props => props.theme.breakpoints[1]}) {
      grid-column: 4 / span 7;
      margin-bottom: ${props => props.theme.space[4]}px;
    }

    @media (min-width: ${props => props.theme.breakpoints[2]}) {
      grid-column: 4 / span 6;
    }
  }
`
const GalleryWrapper = styled(Block)`
  div {
    grid-column: 2 / span 10;
  }
`

const MosaicBlock = styled.div`
  display: flex;
  .gatsby-image-wrapper {
    flex: 1;
    align-self: center;
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
