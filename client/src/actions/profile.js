import React from "react";
import axios from "axios";
import { setAlert } from "../actions/alert";
import {
  CLEAR_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  GET_PROFILES,
  SET_LOADING,
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
  GET_MESSAGES,
  CLEAR_MESSAGES,
  GET_FAVOURITE_PROFILES,
} from "./types";

export const createProfile = ({
  name,
  age,
  sex,
  preferenceMale,
  preferenceFemale,
  photo,
  description,
}) => async (dispatch) => {
  try {
    const body = {
      name,
      age,
      sex,
      preferenceMale,
      preferenceFemale,
      photo,
      description,
    };
    const config = { headers: { "Content-Type": "application/json" } };
    await axios.post("/api/profile", body, config);
    dispatch(setAlert("Profile updated", "success"));
  } catch (error) {
    const errors = error.response.data.errors;
    errors.map((error) => dispatch(setAlert(error.msg, "danger")));
  }
};
export const getProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("api/profile/me");
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get("api/profile");
    dispatch({ type: GET_PROFILES, payload: res.data });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response,
        status: error.response.status,
      },
    });
  }
};

export const getFavProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get("api/profile/fav");
    dispatch({ type: GET_FAVOURITE_PROFILES, payload: res.data });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getMessages = ({ fromUser, toUser }) => async (dispatch) => {
  try {
    const res = await axios.get(`api/profile/message/${fromUser}/${toUser}`);
    dispatch({ type: GET_MESSAGES, payload: res.data.messages });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getAllMessages = ({ fromUser }) => async (dispatch) => {
  try {
    const res = await axios.get(`api/profile/message/${fromUser}`);
    console.log(res.data);
    dispatch({ type: GET_MESSAGES, payload: res.data.messages });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const sendMessage = ({ msg, to }) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await axios.post(`api/profile/message/${to}`, { msg }, config);
    dispatch({ type: SEND_MESSAGE, payload: res.data });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const toggleFavourites = ({ profileIdToLike }) => async (dispatch) => {
  try {
    const res = await axios.post(`api/profile/fav/${profileIdToLike}`);
    // dispatch({ type: SEND_MESSAGE, payload: res.data });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const clearProfile = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
};
export const clearMessages = () => async (dispatch) => {
  dispatch({ type: CLEAR_MESSAGES });
};
export const setLoading = (to = true) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: to });
};
