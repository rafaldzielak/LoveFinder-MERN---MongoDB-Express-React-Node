import React, { Fragment, useEffect, useState } from "react";
import { getProfiles, getProfile } from "../../actions/profile";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export const People = ({
  profile: { profile, profiles, loading },
  getProfiles,
  getProfile,
  auth,
}) => {
  useEffect(() => {
    getProfiles();
    console.log(auth);
    if (auth.isAuthenticated) {
      getProfile();
    }
  }, [getProfiles]);

  // setTimeout(() => {
  //   getProfile();
  // }, 1000);

  let [profileNumber, setProfileNumber] = useState(0);

  const [matchingProfiles, setMatchingProfiles] = useState(
    profiles.filter((checkProfile) => {
      if (checkProfile.sex === "male" && profile.preferenceMale === true)
        return true;
    })
  );

  const nextProfile = () => {
    if (profiles.length > profileNumber + 1) {
      setProfileNumber(++profileNumber);
      console.log(profileNumber);
    }
  };
  const previousProfile = () => {
    if (profiles.length > 0 && profileNumber > 0) {
      setProfileNumber(--profileNumber);
      console.log(profileNumber);
    }
  };

  return (
    <Fragment>
      {loading && <div>LOADING</div>}
      {!loading && profiles.length > 0 && profileNumber >= 0 && (
        <Fragment>
          <div className='flex-rewind'>
            <p id='previous-btn' onClick={(e) => previousProfile()}>
              <i className='fas fa-chevron-left fa-5x'></i>
            </p>

            <div className='inside'>
              <br />
              <br />
              <div className='img-relative'>
                <img
                  id='img-main'
                  src={profiles[profileNumber].photo}
                  alt=''
                ></img>
                <div>
                  <i className='far fa-heart heart-icon fa-2x'></i>
                </div>
              </div>

              <p id='person'>
                {profiles[profileNumber].name} - {profiles[profileNumber].age}{" "}
                Y/O
              </p>
              <p id='age'></p>
              <p className='about'>About me:</p>
              <p id='description'>{profiles[profileNumber].description}</p>
            </div>
            <p id='next-btn' onClick={(e) => nextProfile()}>
              <i className='fas fa-chevron-right fa-5x'></i>
            </p>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

People.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfiles, getProfile })(People);
