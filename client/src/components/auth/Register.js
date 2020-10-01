import React, { Fragment, useState } from "react";
import { connect } from "react-redux";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    pasword2: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { email, password, password2 } = formData;

  return (
    <Fragment>
      <br />
      <br />
      <h2 className='border-bottom'>Register and find True Love</h2>
      <h5>Thousands of people are waiting for You!</h5>
      <div className='row container'>
        <form className='col s12'>
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
          <button
            class='btn btn-large waves-effect blue darken-3'
            type='submit'
            name='action'
          >
            Register
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Register;
