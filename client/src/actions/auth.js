import React from "react";
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";

export const loadUser = () => async (dispatch) => {
  console.log("loadUser");
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
    try {
      const res = await axios.get("api/auth");
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  }
};

export const registerUser = ({ name, email, password, history }) => async (
  dispatch
) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/api/users", body, config);
    console.log(res);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    history.push("/");
  } catch (error) {
    const errors = error.response.data.errors;
    errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
  }
};

export const loginUser = ({ email, password, history }) => async (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/auth", body, config);
    console.log(res);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    history.push("/");
  } catch (error) {
    const errors = error.response.data.errors;

    errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
};
