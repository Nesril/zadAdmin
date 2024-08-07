import React from 'react'
import useCustomStyles from './useCustomStyles';
import curves2 from "../assets/img/curves2.png"
import Theme from '../assets/css/theme'
import { Box, useTheme } from '@mui/material';

export default function CommonSection() {
  return (
         <Box sx={styles?.topContainer}>
            <Box sx={styles?.leftCurve}><img src={curves2}/></Box>
            <Box  sx={styles?.buttomCurve}><img src={curves2}/></Box>
         </Box>
  )
}


const styles = {
  topContainer: {
    height: '100vh',
    width: "100%",
    color: Theme.COLOR_THEME_TWO,
    position:"absolute",
    top:0, 
    left:0,
    zIndex:1
  },
  leftCurve:{
     position:"absolute",
     top:"20px",
     right:"0px",
     transform:"rotateZ(180deg)"
  },
  rightCurve:{
    position:"absolute",
    top:"20px",
    left:"0px",
 },
 buttomCurve:{
   position:"absolute",
   bottom:"0px",
   left:"5px",
},
 
}