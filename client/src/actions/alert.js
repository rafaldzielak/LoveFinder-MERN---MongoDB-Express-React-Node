import React from "react";
import { SET_ALERT, REMOVE_ALERT } from "./types";
import axios from "axios";
import { v4 } from "uuid";

export const setAlert = ({ msg, alertType }) => async (dispatch) => {
  const id = v4();
  dispatch({ type: SET_ALERT, payload: {msg, alertType, id} });
  setTimeout(() => {
    dispatch({ type: REMOVE_ALERT, payload: id });
  }, 3000);
};

export const removeAlert = ({ id }) => async (dispatch) => {
  dispatch({ type: REMOVE_ALERT, payload: id });
};
