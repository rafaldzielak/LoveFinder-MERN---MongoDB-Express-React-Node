import {
  GET_PROFILE,
  PROFILE_ERROR,
  GET_PROFILES,
  CLEAR_PROFILE,
  SET_LOADING,
} from "../actions/types";

const initialState = {
  profile: {},
  profiles: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return { ...state, profile: payload, loading: false };
    case GET_PROFILES:
      return { ...state, profiles: payload, loading: false };
    case CLEAR_PROFILE:
      return { ...state, profile: {}, loading: true };
    case PROFILE_ERROR:
      return { ...state, error: payload, loading: false };
    case SET_LOADING:
      return { ...state, loading: true };

    default:
      return state;
  }
}
