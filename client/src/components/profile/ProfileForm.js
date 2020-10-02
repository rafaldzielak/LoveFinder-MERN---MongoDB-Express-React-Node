import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import Alert from "../layout/Alert";
import { setAlert } from "../../actions/alert";

export const ProfileForm = ({
  createProfile,
  getProfile,
  setAlert,
  history,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    preference: { male: false, female: false },
    photo: "",
    description: "",
  });
  const { name, age, preference, photo, description } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    createProfile({ name, age, preference, photo, description });
  };

  const toggleMale = () => {
    setFormData({
      ...formData,
      preference: { ...preference, male: !preference.male },
    });
  };
  const toggleFemale = () => {
    setFormData({
      ...formData,
      preference: { ...preference, female: !preference.female },
    });
  };

  return (
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
              <label htmlFor='name'>Name</label>
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
              <label htmlFor='age'>Age</label>
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
              <label htmlFor='preference'>Preference: </label>
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
              <label htmlFor='photo'>Photo URL</label>
            </div>
          </div>
          <div className='row'>
            <form className='col s12'>
              <div className='row'>
                <div className='input-field col s12'>
                  <textarea
                    id='textarea1'
                    className='materialize-textarea white-text'
                    name='description'
                    value={description}
                    onChange={(e) => onChange(e)}
                  ></textarea>
                  <label htmlFor='textarea1'>Textarea</label>
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
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile, setAlert })(ProfileForm);
