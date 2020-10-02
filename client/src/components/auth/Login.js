import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { registerUser, loginUser } from "../../actions/auth";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import Alert from "../layout/Alert";
import { setAlert } from "../../actions/alert";

export const Login = ({ loginUser, setAlert, history }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    pasword2: "",
  });
  const { email, password } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    loginUser({ email, password, history });
  };

  return (
    <Fragment>
      <br />
      <br />
      <h2 className='border-bottom'>Register and find True Love</h2>
      <h5>Thousands of people are waiting for You!</h5>
      <Alert />
      <div className='row container'>
        <form className='col s12' onSubmit={(e) => onSubmit(e)}>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                id='email'
                type='email'
                className='validate white-text '
                name='email'
                value={email}
                onChange={(e) => onChange(e)}
              />
              <label htmlFor='email'>Email</label>
            </div>
          </div>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                id='password'
                type='password'
                className='validate white-text'
                name='password'
                value={password}
                onChange={(e) => onChange(e)}
              />
              <label htmlFor='password'>Password</label>
            </div>
          </div>
          <input
            type='submit'
            className='btn btn-large blue darken-3'
            value='Login'
          />
        </form>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

export default connect(null, { loginUser, setAlert })(Login);
