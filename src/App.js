import React, { useEffect, useRef } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/signUp";
import logo from "./assets/img/logo.png";

import "./assets/css/style.css";
import { fetchUser } from "./common/action/authAction";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress, useTheme } from "@mui/material";
import useCustomStyles from "./components/useCustomStyles";
import Programs from "./pages/Programs";
import { fethPrograms } from "./common/action/programAction";
import { fethActivities } from "./common/action/activityAction";
import { fethAdmins } from "./common/action/adminsAction";

const styles = (theme) => ({
  loadingContainer: {},
});
export default function App() {
  const theme = useTheme();
  const classes = useCustomStyles(styles, theme);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  const auth = useSelector((state) => state.auth);

  useEffect(()=>{
        if(auth?.info?._id){
          dispatch(fethPrograms());
          dispatch(fethActivities());
          dispatch(fethAdmins());
        }
  },[auth?.info])
  return auth.loading ? (
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
  ) : (
    <BrowserRouter>
      <Routes>
        {auth?.info?._id ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <>
            <Route path="/logIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
          </>
        )}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
