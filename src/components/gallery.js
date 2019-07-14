/** @jsx jsx */
import { useState } from "react"
import styled from "@emotion/styled"
import { jsx, useColorMode } from "theme-ui"
import Img from "gatsby-image"
import { nameSpacedColours } from "../gatsby-plugin-theme-ui"
import Arrow from "../images/arrow.svg"

// make an inline and grid component, it will get too messy otherwise
export default ({ type, assets }) => {
  //  console.log(assets)
  // gallery
  // 1 is grid
  // 2 is inline
  const [position, setPosition] = useState(0)

  const [mode] = useColorMode()
  const forwards = () => {
    let newPosition = position + 1
    if (newPosition >= assets.length) newPosition = 0
    setPosition(newPosition)
  }
  const backwards = () => {
    let newPosition = position - 1
    if (newPosition <= 0) newPosition = assets.length - 1
    setPosition(newPosition)
  }

  return (
    <Container type={type}>
      <Item
        key={String(assets[position].id)}
        onClick={forwards}
        sx={{
          mb: [2, 3],
        }}
      >
        <Img
          fluid={assets[position].media.childImageSharp.fluid}
          alt={assets[position].alt_text}
        />
      </Item>

      <Actions
        sx={{
          color: "mutedText",
          fontSize: 2,
          lineHeight: 1.2,
        }}
      >
        <Caption>
          {JSON.parse(assets[position].pivot.metadatas).caption}
        </Caption>

        <Arrows mode={mode}>
          <span
            sx={{
              px: 3,
            }}
          >
            {position + 1} of {assets.length}
          </span>
          <Arrow
            onClick={backwards}
            sx={{
              transform: "rotate(180deg)",
              mr: 2,
              mt: 1,
            }}
          />
          <Arrow
            onClick={forwards}
            sx={{
              ml: 2,
              mt: 1,
            }}
          />
        </Arrows>
      </Actions>
    </Container>
  )
}

const Container = styled.div``
const Item = styled.div``
const Caption = styled.div`
  flex: 1;
`
const Actions = styled.div`
  display: flex;
`
const Arrows = styled.div`
  display: flex;
  align-self: flex-end;
  svg {
    cursor: pointer;
  }
  .ArrowColour {
    fill: ${props =>
      props.mode === "dark"
        ? nameSpacedColours.offWhite
        : nameSpacedColours.black};
  }
`
