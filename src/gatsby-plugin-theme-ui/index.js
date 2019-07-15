// default/base theme
const heading = {
  color: 'text',
  fontFamily: 'heading',
  lineHeight: '1.2',
  fontWeight: 'heading',
}

  export const nameSpacedColours = {
    black: '#111111',
    offBlack : "rgba(0,0,0,0.6)",
    darkGrey: '#888888',
    midGrey: '#c6c1c1',
    lightGrey: '#E6E4E4',
    offWhite: '#F6F6F6',
    white: '#fff',
    yellow: '#FFB909',
    purple: '#0D084D',
    royalBlue:'#004CFF'
  }
  
  export default {
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
    breakpoints: [
       '1024px', 
    ],
    fonts: {
      body: 'neue-haas-unica, system-ui, sans-serif',
      heading: 'neue-haas-unica, system-ui, sans-serif',
      monospace: 'Menlo, monospace',
    },
    //          0  1  2  3  4  5  6  7  8  9  10 11
    fontSizes: [10,12,14,16,20,24,32,40,48,56,72,92],
    fontWeights: {
      body: 400,
      heading: 400,
      bold: 600,
    },
    lineHeights: { 
      body: 1.5,
      heading: 1.125,
    }, 
    colors: {
      text : nameSpacedColours.offWhite,
      hover : nameSpacedColours.offWhite ,
      background : nameSpacedColours.black,
      muted : nameSpacedColours.lightGrey,
      mutedText : nameSpacedColours.darkGrey,
      accent : nameSpacedColours.purple,
      primary : nameSpacedColours.royalBlue,
      modes: {
        dark: {
          text : nameSpacedColours.black,
          hover : nameSpacedColours.black,
          background : nameSpacedColours.offWhite,
          muted : nameSpacedColours.black,
          mutedText : nameSpacedColours.offBlack,
          accent : nameSpacedColours.yellow,
          primary : nameSpacedColours.royalBlue,
        },
      },
    },
    styles: {
      root: {
        fontFamily: 'body',
        lineHeight: 'body',
        fontWeight: 'body',
        fontSize:  [2,5],
        color: 'text',
        bg: 'background',
      },
      h1: {
        ...heading,
        fontSize:  [11,5],
      },
      h2: {
        ...heading,
        fontSize:  [10,4],
      },
      h3: {
        ...heading,
        fontSize:  [9,3],
      },
      h4: {
        ...heading,
        fontSize:  [8,2],
      },
      h5: {
        ...heading,
        fontSize:  [7,1],
      },
      h6: {
        ...heading,
        fontSize: [6,0],
      },
      p: {
        color: 'text',
        fontFamily: 'body',
        fontWeight: 'body',
        lineHeight: 'body',
        fontSize:  [5,2],
      },
      a: {
        color: 'primary'
      },
      pre: {
        fontFamily: 'monospace',
        overflowX: 'auto',
        code: {
          color: 'inherit',
        },
      },
      code: {
        fontFamily: 'monospace',
        fontSize: 'inherit',
      },
      table: {
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: 0,
      },
      th: {
        textAlign: 'left',
        borderBottomStyle: 'solid',
      },
      td: {
        textAlign: 'left',
        borderBottomStyle: 'solid',
      },
      Main: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)'
      },
    
    },
    textStyles: {
      SmallParagraph: {
        color: 'text',
        fontFamily: 'body',
        fontWeight: 'body',
        lineHeight: 'body',
        fontSize:  2,
      },
    }
  }