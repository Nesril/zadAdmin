import axios from "axios";
import {
    FETCH_PROGRAMS,
    FETCH_PROGRAMS_SUCCESS,
    FETCH_PROGRAMS_FAILED,

    CREATE_PROGRAMS,
    CREATE_PROGRAMS_SUCCESS,
    CREATE_PROGRAMS_FAILED,

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
  
export const createPrograms = (data) => async (dispatch) => {

    try {
      dispatch({
        type: CREATE_PROGRAMS,
        payload: data,
      });
  
      const authToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];
      axios
      .post(`${process.env.REACT_APP_BACKEND_API}/programs/addProgram`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
             Authorization: `Bearer ${authToken}`,
        },
      })

      .then((response) => {
        dispatch({ type: CREATE_PROGRAMS_SUCCESS, payload: response?.data })
        dispatch(fethPrograms())
      })

      .catch((error) => {
        console.error(error);
        dispatch({ type: CREATE_PROGRAMS_FAILED, payload: error?.response?.data});
      });
      
      
    } catch (error) {
      dispatch({
        type: CREATE_PROGRAMS_FAILED,
        payload: { error: "error occured" },
      });
    }
  };


export const updatePrograms = (data) => async (dispatch) => {
    try {
      dispatch({
        type: CREATE_PROGRAMS,
        payload: data,
      });
  
      const authToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];
      
      axios
      .put( `${process.env.REACT_APP_BACKEND_API}/programs/updateProgram`, data, {
        headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${authToken}`,
        },
      })
  
      .then((response) => {
        dispatch({ type: CREATE_PROGRAMS_SUCCESS, payload: response?.data })
        dispatch(fethPrograms())
      })
  
      .catch((error) => {
        console.error(error);
        dispatch({ type: CREATE_PROGRAMS_FAILED, payload: error?.response?.data});
      });
      
      
    } catch (error) {
      dispatch({
        type: CREATE_PROGRAMS_FAILED,
        payload: { error: "error occured" },
      });
    }
  };
  
  export const deletePrograms = (data) => async (dispatch) => {
    try {
      dispatch({
        type: CREATE_PROGRAMS,
        payload: data,
      });
  
      const authToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];
  
      axios
      .delete( `${process.env.REACT_APP_BACKEND_API}/programs/deleteProgram/${data}`, {
        headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${authToken}`,
        },
      })
  
      .then((response) => {
        dispatch({ type: CREATE_PROGRAMS_SUCCESS, payload: response?.data })
        dispatch(fethPrograms())
      })
  
      .catch((error) => {
        console.error(error);
        dispatch({ type: CREATE_PROGRAMS_FAILED, payload: error?.response?.data});
      });
      
      
    } catch (error) {
      dispatch({
        type: CREATE_PROGRAMS_FAILED,
        payload: { error: "error occured" },
      });
    }
  };
  
