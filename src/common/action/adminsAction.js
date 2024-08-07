import {
    FETCH_ADMINS,
    FETCH_ADMINS_SUCCESS,
    FETCH_ADMINS_FAILED,
  
  } from "../store/types";


export const fethAdmins = () => async (dispatch) => {
    try {
      const authToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];
  
      dispatch({
        type: FETCH_ADMINS,
        payload: authToken,
      });
  
  
      if (authToken) {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_API}/user/getAllAdmins`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const programs = await response.json();
        dispatch({ type: FETCH_ADMINS_SUCCESS, payload: programs });
        
      } else {
        dispatch({
          type: FETCH_ADMINS_FAILED,
          payload: null ,
        });
      }
    } catch (error) {
      dispatch({ type: FETCH_ADMINS_FAILED, payload: { error: "Error occured" } });
    }
  };
  