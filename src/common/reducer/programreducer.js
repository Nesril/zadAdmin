import {
  FETCH_PROGRAMS,
  FETCH_PROGRAMS_SUCCESS,
  FETCH_PROGRAMS_FAILED,

} from "../store/types";

const INITIAL_STATE = {
  info: null,
  loading: true,
  error: null,
  programs: null,
};

export const ProgramsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PROGRAMS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PROGRAMS_SUCCESS:
      return {
        ...state,
        programs: action.payload,
        loading: false,
        error: null,
        info: null,
      };
    case FETCH_PROGRAMS_FAILED:
      return {
        ...state,
        programs: null,
        info: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
