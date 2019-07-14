/** @jsx jsx */

import PropTypes from "prop-types"
import {Link} from 'gatsby'
import {  jsx,  useColorMode, Layout, Header, Main } from 'theme-ui'
import './layout.css' 
import { nameSpacedColours} from '../gatsby-plugin-theme-ui'
import ColourModeIcon from '../images/colourMode.svg'
const SiteWrapper = ({  children }) => {
  console.log(children)
  const [mode, setMode] = useColorMode()
  const toggleMode = e => {
    setMode(mode === 'dark' ? 'light' : 'dark')
  }
 
  return ( 
    <Layout>
      <Header
        sx={{
          height: ['96px','128px'],
          display:'flex',
          alignItems:'center',
          justifyContent: 'flex-end',
          px: [3,4]
        }}
      >
        <ColourModeIcon 
          onClick={toggleMode} 
          css={`
            transition:all 0.3s ease; 
            transform: rotate(${mode==='dark' ? '180': '0'}deg);
            transform-origin:center;
            cursor:pointer;
            #ColourModeIcon { 
              stroke : ${mode==='dark' ? nameSpacedColours.black: nameSpacedColours.offWhite};
            }
        `}/>
        <h1 sx={{
          fontFamily: 'heading',
          fontSize : [5,6],
          fontWeight: 'heading',
          lineHeight: 1,
          flex:1,
          display:'flex',
          justifyContent:'flex-end'
        }}><Link to="/" sx={{textDecoration:'none', color: 'text'}}>Thomas<br/>Brasington</Link></h1>
      
      </Header> 
      
      <Main>
        {children}
      </Main>
    
    </Layout> 
  )
}
 
SiteWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SiteWrapper
