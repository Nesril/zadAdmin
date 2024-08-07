import React from "react";
import { Box, Button, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import Theme from "../../assets/css/theme";
import { useDispatch, useSelector } from "react-redux";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom";


export default function Header() {
  const auth = useSelector((state) => state.auth);

  return (
    <Box sx={styles?.header}>
      <Box>
        <Link to="/" style={{color:"white",textDecoration:"none",fontSize:23}}>
            Zad Al-Mead
        </Link>
      </Box>
     
      <Box sx={styles.navigations}>
        <Link to="/programs" style={{textDecoration:"none"}}>
              <Typography sx={styles?.textColor}>Programs</Typography>
        </Link>
        <Link to="/announcement" style={{textDecoration:"none"}}>
              <Typography sx={styles?.textColor}>Announcements</Typography>
        </Link>
        <Link to="/transactions" style={{textDecoration:"none"}}>
              <Typography sx={styles?.textColor}>Transactions</Typography>
        </Link>
       {auth?.info?.admin?.adminType==='full'&&<Link to="/admins" style={{textDecoration:"none"}}>
              <Typography sx={styles?.textColor}>Admins</Typography>
        </Link>}
        <Link to="/profile" style={{textDecoration:"none"}}>
              <Typography sx={styles?.textColor}>My Profile</Typography>
        </Link>

      </Box>
    </Box>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: 'white',
    width: "95%",
    position: "absolute",
    top: 0,
    left: 0,
    background: "transparent",
    height: "fit-content",
    zIndex: 10,
    marginTop: 3,
    padding:'0 10px 0 30px'
  },
  textColor: {
    color: "white",
  },
  navigations:{
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    gap:5
  }
}