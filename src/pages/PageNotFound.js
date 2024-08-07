
import React, { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import logo from "../assets/img/logo.png";

export default function PageNotFound() {
  let location=useLocation()
let navigate = useNavigate()
const auth=useSelector(state=>state.auth)

useEffect(()=>{
    let route = location.pathname.split("/")
    console.log(route);
    if(auth?.info?._id){
           if(route.length>1&&route[1]!=='profile'){
               navigate("/")
           }
    }
    else{
      if(route.length===1||route.length>2){
        navigate("/logIn")
      }
      if(route[1]!=="logIn" && route[1]!=="signUp"){
        navigate("/logIn")
    }
    }
},[])
  return (
    <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      height: "100vh",
    }}
  >
    <div>
      <img
        src={logo}
        style={{ width: "200px", objectFit: "cover" }}
        alt="logo.pic"
      />
    </div>
     <Typography>404: Page Not Found</Typography>
  </div>
  )
}
