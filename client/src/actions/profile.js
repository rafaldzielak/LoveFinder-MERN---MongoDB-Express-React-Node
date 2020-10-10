import React from "react";
import PropTypes from "prop-types";
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
    console.log(error);
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
        msg: error.response.statusText,
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
    console.log("toUser: " + toUser);
    const res = await axios.get(`api/profile/message/${fromUser}/${toUser}`);
    console.log("RES.data:");
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
    console.log(`api/profile/message/${to}`);
    console.log(msg);
    const res = await axios.post(`api/profile/message/${to}`, { msg }, config);
    console.log("SEND MESSAGE RES.data:");
    console.log(res.data);
    dispatch({ type: SEND_MESSAGE, payload: res.data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addToFavourites = ({ profileIdToLike }) => async (dispatch) => {
  try {
    console.log(`api/profile/fav/${profileIdToLike}`);
    const res = await axios.post(`api/profile/fav/${profileIdToLike}`);
    console.log("SEND MESSAGE RES.data:");
    console.log(res.data);
    // dispatch({ type: SEND_MESSAGE, payload: res.data });
  } catch (error) {
    console.log(error);
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
export const setLoading = () => async (dispatch) => {
  dispatch({ type: SET_LOADING });
};
