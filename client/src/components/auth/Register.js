import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/auth";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import Alert from "../layout/Alert";
import { setAlert } from "../../actions/alert";

export const Register = ({ registerUser, setAlert, history }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    pasword2: "",
  });
  const { name, email, password, password2 } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger" );
    } else {
      registerUser({ name, email, password, history });
    }
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
                id='name'
                type='text'
                className='validate white-text '
                name='name'
                value={name}
                onChange={(e) => onChange(e)}
              />
              <label htmlFor='name'>Name</label>
            </div>
          </div>
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
          <div className='row'>
            <div className='input-field col s12'>
              <input
                id='password'
                type='password'
                className='validate white-text'
                name='password2'
                value={password2}
                onChange={(e) => onChange(e)}
              />
              <label htmlFor='password'>Confirm password</label>
            </div>
          </div>
          {/* <input type='submit' className='btn btn-primary' value='Register' /> */}
          <input
            type='submit'
            className='btn btn-large blue darken-3'
            value='Register'
          />
        </form>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
};

export default connect(null, { registerUser, setAlert })(Register);
