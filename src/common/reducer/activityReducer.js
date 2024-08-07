import {
    FETCH_ACTIVITIES,
    FETCH_ACTIVITIES_SUCCESS,
    FETCH_ACTIVITIES_FAILED,
  
  } from "../store/types";
  
  const INITIAL_STATE = {
    info: null,
    loading: true,
    error: null,
    activities: null,
  };
  
  export const activityReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_ACTIVITIES:
        return {
          ...state,
          loading: true,
        };
      case FETCH_ACTIVITIES_SUCCESS:
        return {
          ...state,
          activities: action.payload,
          loading: false,
          error: null,
          info: null,
        };
      case FETCH_ACTIVITIES_FAILED:
        return {
          ...state,
          activities: null,
          info: null,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  