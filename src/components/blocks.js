/** @jsx jsx */
import { jsx } from 'theme-ui'
import Img from 'gatsby-image'
import styled from '@emotion/styled'
import ReactPlayer from 'react-player' 
import Gallery from './gallery'
export default ({ data }) => {
    return (() => {
      switch (data.type) {
        case 'text':
          return (
   
            <TextWrapper
              key={data.id}
              sx={{
                variant: 'styles',
                width: 'auto',
                px: [3,6],
                py : [3,5]
              }}
              dangerouslySetInnerHTML={{ __html: data.content.text }}
              
            />
          )
        case 'image':
          return data.childrenMedia.map(media => {
            return media.role === 'image' ? (
              <InlineAsset key={data.id}>
                <InlineAssetWrapper>
                  <Img fluid={media.media.childImageSharp.fluid} />
                </InlineAssetWrapper>
              </InlineAsset>
            ) : null
          })
        case 'video':
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
        case 'gallery':
          return (
            <GalleryWrapper 
                key={data.id} 
                sx={{
                  bg: 'muted',
                  px : [3,5],
                  py: [3,5]
                }}> 
              <Gallery
                type={data.content.galleryType}
                assets={data.childrenMedia}
              />
            </GalleryWrapper>
          )
        case 'mosaic':
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
        default:
          return null
      }
    })()
  }
 
const InlineAsset = styled.div`
 
`
const InlineAssetWrapper = styled.div`
 
`

const InlineVideoWrapper = styled.div`

`


const TextWrapper = styled.div`
margin:auto;
max-width:1440px;

@media (min-width: ${props=> props.theme.breakpoints[0]}) {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
}
 h2 { 
    grid-column: 0 / span 2;
    margin-bottom:  ${props=> props.theme.space[2]}px;
    @media (min-width: ${props=> props.theme.breakpoints[0]}) {
        margin-bottom:  ${props=> props.theme.space[4]}px;
    }
 }
 p, h3,h4,h5 { 
    grid-column: 4 / span 12;
    margin-bottom:  ${props=> props.theme.space[2]}px;
    @media (min-width: ${props=> props.theme.breakpoints[0]}) {
        margin-bottom:  ${props=> props.theme.space[4]}px;
    }
    
 }



`
const GalleryWrapper = styled.div`

> div {
 max-width:1440px;
 margin:auto;
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