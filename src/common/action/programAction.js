import {
    FETCH_PROGRAMS,
    FETCH_PROGRAMS_SUCCESS,
    FETCH_PROGRAMS_FAILED,
  
  } from "../store/types";


export const fethPrograms = () => async (dispatch) => {
    try {
      const authToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];
  
      dispatch({
        type: FETCH_PROGRAMS,
        payload: authToken,
      });
  
  
      if (authToken) {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_API}/programs/getAllPrograms`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const programs = await response.json();
        dispatch({ type: FETCH_PROGRAMS_SUCCESS, payload: programs });
        
      } else {
        dispatch({
          type: FETCH_PROGRAMS_FAILED,
          payload: null ,
        });
      }
    } catch (error) {
      dispatch({ type: FETCH_PROGRAMS_FAILED, payload: { error: "Error occured" } });
    }
  };
  