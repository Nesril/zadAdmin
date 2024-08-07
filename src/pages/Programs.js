import React, { useEffect, useState, useRef } from "react";
import { Box, CircularProgress, useTheme } from "@mui/material";
import CommonSection from "../components/commonSection";
import Header from "../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import Theme from "../assets/css/theme";


export default function Programs() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  console.log(auth.info);


  return (
    <Box sx={styles?.container}>
      <CommonSection />
      <Header />

      <Box sx={styles?.content}>
            Programs
      </Box>
    </Box>
  );
}


const styles = {
  container: {
    background: `linear-gradient(-20deg,${Theme.COLOR_THEME_TWO} 0%, ${Theme.COLOR_THEME_ONE} 100%)`,
    minHeight: "100vh",
    padding: "90px 40px 30px 40px",
  },
  content: {
    position: "relative",
    top: "0px",
    width: "100%",
    zIndex: 2,
    color:'white'
   },
}