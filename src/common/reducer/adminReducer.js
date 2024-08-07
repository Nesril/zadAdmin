import {
    FETCH_ADMINS,
    FETCH_ADMINS_SUCCESS,
    FETCH_ADMINS_FAILED,
  
  } from "../store/types";
  
  const INITIAL_STATE = {
    info: null,
    loading: true,
    error: null,
    admins: null,
  };
  
  export const AdminReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_ADMINS:
        return {
          ...state,
          loading: true,
        };
      case FETCH_ADMINS_SUCCESS:
        return {
          ...state,
          admins: action.payload,
          loading: false,
          error: null,
          info: null,
        };
      case FETCH_ADMINS_FAILED:
        return {
          ...state,
          admins: null,
          info: null,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  