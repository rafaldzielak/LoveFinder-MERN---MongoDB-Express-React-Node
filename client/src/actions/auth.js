import React from "react";
import { REGISTER_SUCCESS } from "./types";
import axios from "axios";

export const registerUser = ({ name, email, password }) => async (dispatch) => {
  console.log(email);
  console.log(password);
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/api/users", body, config);
    console.log(res);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
  } catch (error) {
    const errors = error.response.data.errors;
    errors.forEach((err) => console.log(err));
  }
};
