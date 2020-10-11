import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { createProfile, getProfile, setLoading } from "../../actions/profile";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import Alert from "../layout/Alert";
import { setAlert } from "../../actions/alert";

export const ProfileForm = ({
  createProfile,
  getProfile,
  history,
  auth,
  profile: { profile, loading },
  setLoading,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    sex: "",
    preferenceMale: false,
    preferenceFemale: false,
    photo: "",
    description: "",
  });

  const { name, age, sex, preferenceMale, preferenceFemale, photo, description } = formData;

  useEffect(() => {
    if (profile) {
      if (!profile.name) getProfile();
      else setLoading(false);
      setFormData({
        ...formData,
        name: loading || !profile.name ? "" : profile.name,
        age: loading || !profile.age ? "" : profile.age,
        sex: loading || !profile.sex ? "" : profile.sex,
        preferenceMale: loading || !profile.preferenceMale ? "" : profile.preferenceMale,
        preferenceFemale: loading || !profile.preferenceFemale ? "" : profile.preferenceFemale,
        photo: loading || !profile.photo ? "" : profile.photo,
        description: loading || !profile.description ? "" : profile.description,
      });
    }
  }, [getProfile, loading, auth]);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    createProfile({
      name,
      age,
      sex,
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

  const setGender = (e) => {
    setFormData({ ...formData, sex: e.target.value });
  };

  return (
    <Fragment>
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
                <div className='input-field col s12' onChange={(e) => setGender(e)}>
                  <p>
                    <label>
                      <input name='sex' type='radio' value='male' checked={sex === "male"} />
                      <span className='radio'>Male</span>
                    </label>
                    <label>
                      <input name='sex' type='radio' value='female' checked={sex === "female"} />
                      <span>Female</span>
                    </label>
                  </p>
                  <label className='active' htmlFor='sex'>
                    Sex:{" "}
                  </label>
                </div>
              </div>

              <div className='row'>
                <div className='input-field col s12'>
                  <p>
                    <label>
                      <input
                        checked={preferenceMale}
                        type='checkbox'
                        onChange={(e) => toggleMale()}
                      />
                      <span className='checkbox'>Male</span>
                    </label>
                    <label>
                      <input
                        checked={preferenceFemale}
                        type='checkbox'
                        onChange={(e) => toggleFemale()}
                      />
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
                        onChange={(e) => onChange(e)}></textarea>
                      <label className='active' htmlFor='description'>
                        Description
                      </label>
                    </div>
                  </div>
                </form>
              </div>

              {/* <input type='submit' className='btn btn-primary' value='Register' /> */}
              <input type='submit' className='btn btn-large blue darken-3' value='Submit' />
            </form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  createProfile,
  setAlert,
  getProfile,
  setLoading,
})(ProfileForm);
