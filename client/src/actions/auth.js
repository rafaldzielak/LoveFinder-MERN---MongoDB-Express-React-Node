import React from "react";
import { REGISTER_SUCCESS } from "./types";
import axios from "axios";

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
    // const errors = error.response.data.errors;
    console.log(error);
    // errors.forEach((err) => console.log(err));
  }
};
