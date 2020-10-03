import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { setAlert } from "../actions/alert";
import {
  CLEAR_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  SET_LOADING,
} from "./types";

export const createProfile = ({
  name,
  age,
  preferenceMale,
  preferenceFemale,
  photo,
  description,
}) => async (dispatch) => {
  try {
    const body = {
      name,
      age,
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
      payload: error.response.statusText,
      status: error.response.status,
    });
  }
};

export const clearProfile = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
};
