import React, { useEffect, useState } from "react";
import CommonSection from "../components/commonSection";
import Theme from "../assets/css/theme";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Link,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import useCustomStyles from "../components/useCustomStyles";
import { Radio } from "antd";
import { useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import {
  fetchUser,
  logIn,
} from "../common/action/authAction";
import { useDispatch, useSelector } from "react-redux";


export default function SignIn() {
  const theme = useTheme();
  const auth = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [unFieldComponents, setUnFieldComponents] = useState({
    email: false,
    password: false,
  });

  let navigate = useNavigate()

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !email.trim()) {
      return false;
    }
    return emailRegex.test(email.toLowerCase());
  }

  useEffect(() => {
    if (isValidEmail(email))
      setUnFieldComponents((e) => ({ ...e, email: false }));
    if(password)
       setUnFieldComponents((e) => ({ ...e, password: false }));
  }, [email]);

  function submiteData() {
    if (!isValidEmail(email))
      return setUnFieldComponents((e) => ({ ...e, email: true }));

      if(!password)
         setUnFieldComponents((e) => ({ ...e, password: false }));

    const dataToBePassed = {
      email: email,
      password:password
    };
    dispatch(logIn(dataToBePassed));
  }
  
  return (
    <Box sx={styles?.container}>
      <CommonSection />
      <Box sx={styles?.contents}>
        <Box sx={styles?.box}>
          <>
            <Typography variant="h4" sx={styles?.title}>Sign In</Typography>
            <Box sx={styles?.form}>
              <Box sx={{width:"60%"}}>
                <CustomInput
                  id="email"
                  labelText="Email"
                  labelColor="rgba(255, 255, 255, 0.7"
                  error={unFieldComponents.email}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: "email",
                  }}
                  color="white"
                  value={email}
                  required={true}
                  onChange={(e) => setEmail(e.target.value.trim())}
                />
              </Box>

              <Box sx={{width:"60%"}}>
                <CustomInput
                  id="password"
                  labelText="Password"
                  required={true}
                  labelColor="rgba(255, 255, 255, 0.7"
                  error={unFieldComponents.password}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: "email",
                  }}
                  color="white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value.trim())}
                />
              </Box>


              <Box>
                {auth.signInLoading ? (
                  <CircularProgress size={25} />
                ) : (
                  <Button sx={styles?.button} onClick={submiteData}>
                    Sign in
                  </Button>
                )}
              </Box>

              {auth.error && (
                <Box
                  style={{
                    color: "red",
                    width: "100%",
                    fontSize: "12px",
                  }}
                >
                  <Alert
                    severity="error"
                    style={{
                      fontSize: "12px",
                      paddingTop: "2px",
                      paddingBottom: "2px",
                    }}
                  >
                    {auth?.error?.error}
                  </Alert>
                </Box>
              )}

              {/* <p style={{ fontSize: "12px" }}>
                Dont have an account ?{" "}
                <a
                  style={{ cursor: "pointer", color: "#c48f8f" }}
                  href="/signUp"
                >
                  Sign Up
                </a>
              </p> */}
            </Box>
          </>
              
        </Box>
      </Box>
    </Box>
  );
}

const styles = {
  container: {
    background: `linear-gradient(-20deg,${Theme.COLOR_THEME_TWO} 0%, ${Theme.COLOR_THEME_ONE} 100%)`,
    minHeight:"100vh"
  },
  contents: {
    position: "relative",
    top: "100px",
    width: "100%",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
  },
  box: {
    background: "rgba(255, 255, 255, 0.1)",
    color: Theme.COLOR_THEME_THREE,
    padding: "20px",
    borderRadius: "20px",
    width: "50%",
    maxWidth: "500px",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    color:"white"
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "20px",
    width:"100%"
  },
  button: {
    marginTop: "13px",
    background: "red",
    color: "white",
    "&:hover": {
      background: "red",
      opacity: 0.7,
    },
  },
}
