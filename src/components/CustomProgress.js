import { CircularProgress } from '@mui/material'
import React from 'react'
import logo from "../assets/img/logo.png";

export default function CustomProgress() {
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
    <CircularProgress size={30} style={{ textAlign: "center" }} />
  </div>
  )
}
