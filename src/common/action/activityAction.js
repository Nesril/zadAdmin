import {
    FETCH_ACTIVITIES,
    FETCH_ACTIVITIES_SUCCESS,
    FETCH_ACTIVITIES_FAILED,
  
  } from "../store/types";


export const fethActivities = () => async (dispatch) => {
    try {
      const authToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];
  
      dispatch({
        type: FETCH_ACTIVITIES,
        payload: authToken,
      });
  
  
      if (authToken) {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_API}/user/getActivities`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const programs = await response.json();
        dispatch({ type: FETCH_ACTIVITIES_SUCCESS, payload: programs });
        
      } else {
        dispatch({
          type: FETCH_ACTIVITIES_FAILED,
          payload: null ,
        });
      }
    } catch (error) {
      dispatch({ type: FETCH_ACTIVITIES_FAILED, payload: { error: "Error occured" } });
    }
  };
  