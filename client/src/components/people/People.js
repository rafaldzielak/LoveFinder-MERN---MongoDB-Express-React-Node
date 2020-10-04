import React, { Fragment, useEffect, useState } from "react";
import { getProfiles, getProfile } from "../../actions/profile";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { check } from "express-validator";

export const People = ({
  profile: { profile, profiles, loading },
  getProfiles,
  getProfile,
  auth,
}) => {
  const [matchingProfiles, setMatchingProfiles] = useState(
    profiles.filter((checkProfile) => {
      if (checkProfile.sex === "male" && profile.preferenceMale === true)
        return true;
    })
  );
  useEffect(() => {
    getProfiles();
    console.log(auth);
  }, [getProfiles]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      getProfile();
    }
  }, [auth.loading]);

  useEffect(() => {
    console.log("load changes");
    setMatchingProfiles(
      profiles.filter((checkProfile, index) => {
        console.log(checkProfile);
        if (checkProfile.sex === "male" && profile.preferenceMale === true)
          return true;
      })
    );
    console.log(profiles);
    console.log(matchingProfiles);
  }, [loading, profiles]);

  let [profileNumber, setProfileNumber] = useState(0);

  const nextProfile = () => {
    if (profiles.length > profileNumber + 1) {
      setProfileNumber(++profileNumber);
      console.log(profileNumber);
    }
  };
  const previousProfile = (profs) => {
    if (profiles.length > 0 && profileNumber > 0) {
      setProfileNumber(--profileNumber);
      console.log(profileNumber);
    }
  };

  const nextProfileMatch = () => {
    if (matchingProfiles.length > profileNumber + 1) {
      setProfileNumber(++profileNumber);
      console.log(profileNumber);
    }
  };
  const previousProfileMatch = () => {
    if (matchingProfiles.length > 0 && profileNumber > 0) {
      setProfileNumber(--profileNumber);
      console.log(profileNumber);
    }
  };

  const display = (profs) => (
    <div className='flex-rewind'>
      <p id='previous-btn' onClick={(e) => previousProfileMatch()}>
        <i className='fas fa-chevron-left fa-5x'></i>
      </p>
      {console.log("PROFS")}
      {console.log(profs)}

      <div className='inside'>
        <br />
        <br />
        <div className='img-relative'>
          <img id='img-main' src={profs[profileNumber].photo} alt=''></img>
          <div>
            <i className='far fa-heart heart-icon fa-2x'></i>
          </div>
        </div>

        <p id='person'>
          {profs[profileNumber].name} - {profs[profileNumber].age} Y/O
        </p>
        <p id='age'></p>
        <p className='about'>About me:</p>
        <p id='description'>{profs[profileNumber].description}</p>
      </div>
      <p id='next-btn' onClick={(e) => nextProfileMatch()}>
        <i className='fas fa-chevron-right fa-5x'></i>
      </p>
    </div>
  );

  return (
    <Fragment>
      {loading && <div>LOADING</div>}
      {!loading && profiles.length > 0 && profileNumber >= 0 && (
        <Fragment>
          {console.log(matchingProfiles.length)}
          {auth.isAuthenticated && matchingProfiles.length > 0 ? (
            display(matchingProfiles)
          ) : (
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
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

People.propTypes = {
  getProfile: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfiles, getProfile })(People);
