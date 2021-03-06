import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { createProfile, getProfile } from "../../actions/profile";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import Alert from "../layout/Alert";
import { setAlert } from "../../actions/alert";

export const ProfileFormItem = ({
  createProfile,
  history,
  auth,
  profile: { profile, loading },
}) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    preferenceMale: false,
    preferenceFemale: false,
    photo: "",
    description: "",
  });

  const {
    name,
    age,
    preferenceMale,
    preferenceFemale,
    photo,
    description,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    createProfile({
      name,
      age,
      preferenceMale,
      preferenceFemale,
      photo,
      description,
    });
  };

  const toggleMale = () => {
    setFormData({ ...formData, preferenceMale: !preferenceMale });
  };
  const toggleFemale = () => {
    setFormData({ ...formData, preferenceFemale: !preferenceFemale });
  };

  // if (!loading && !auth.isAuthenticated) {
  // return <Redirect to='/'></Redirect>;
  // } else
  return (
    <Fragment>
      {console.log("DUPA2")}
      {loading ? (
        <div>LOADING</div>
      ) : (
        <Fragment>
          <br />
          <br />
          <h2 className='border-bottom'>Create Your Profile</h2>
          <h5>Nice description gives you better chance to find true love</h5>
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
                  <label className='active' htmlFor='name'>
                    Name
                  </label>
                </div>
              </div>
              <div className='row'>
                <div className='input-field col s12'>
                  <input
                    id='age'
                    type='number'
                    className='validate white-text '
                    name='age'
                    value={age}
                    min='18'
                    max='99'
                    onChange={(e) => onChange(e)}
                  />
                  <label className='active' htmlFor='age'>
                    Age
                  </label>
                </div>
              </div>
              <div className='row'>
                <div className='input-field col s12'>
                  <p>
                    <label>
                      <input type='checkbox' onClick={(e) => toggleMale()} />
                      <span className='checkbox'>Male</span>
                    </label>
                    <label>
                      <input type='checkbox' onClick={(e) => toggleFemale()} />
                      <span>Female</span>
                    </label>
                  </p>
                  <label className='active' htmlFor='preference'>
                    Preference:{" "}
                  </label>
                </div>
              </div>
              <div className='row'>
                <div className='input-field col s12'>
                  <input
                    id='photo'
                    type='text'
                    className='validate white-text'
                    name='photo'
                    value={photo}
                    onChange={(e) => onChange(e)}
                  />
                  <label className='active' htmlFor='photo'>
                    Photo URL
                  </label>
                </div>
              </div>
              <div className='row'>
                <form className='col s12'>
                  <div className='row'>
                    <div className='input-field col s12'>
                      <textarea
                        id='description'
                        className='materialize-textarea white-text'
                        name='description'
                        value={description}
                        onChange={(e) => onChange(e)}
                      ></textarea>
                      <label className='active' htmlFor='description'>
                        Description
                      </label>
                    </div>
                  </div>
                </form>
              </div>

              {/* <input type='submit' className='btn btn-primary' value='Register' /> */}
              <input
                type='submit'
                className='btn btn-large blue darken-3'
                value='Submit'
              />
            </form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};


export default ProfileFormItem