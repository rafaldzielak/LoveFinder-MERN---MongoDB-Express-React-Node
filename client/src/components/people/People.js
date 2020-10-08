import React, { Fragment, useEffect, useState } from "react";
import { getProfiles, getProfile } from "../../actions/profile";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { check } from "express-validator";
import { Link, Redirect, useHistory } from "react-router-dom";

export const People = ({
  profile: { profile, profiles, loading },
  getProfiles,
  getProfile,
  auth,
}) => {
  const [matchingProfiles, setMatchingProfiles] = useState(
    profiles.filter((p) => {
      if (profile) {
        if (
          (p.sex === "male" && profile.preferenceMale) ||
          (p.sex === "female" && profile.preferenceFemale)
        ) {
          return true;
        }
      }
    })
  );
  const history = useHistory();
  useEffect(() => {
    console.log(auth);
    getProfiles();
  }, [getProfiles]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      getProfile();
    }
  }, [auth.loading]);

  useEffect(() => {
    if (profile) {
      setMatchingProfiles(
        profiles.filter((p, index) => {
          if (
            (p.sex === "male" &&
              profile.preferenceMale === true &&
              (profile.sex === "male"
                ? p.preferenceMale
                : p.preferenceFemale)) ||
            (p.sex === "female" &&
              profile.preferenceFemale === true &&
              (profile.sex === "female"
                ? p.preferenceFemale
                : p.preferenceMale))
          ) {
            return true;
          }
        })
      );
    }
  }, [loading, profile]);

  let [profileNumber, setProfileNumber] = useState(0);

  const nextProfile = (profs) => {
    if (profs.length > profileNumber + 1) {
      setProfileNumber(++profileNumber);
      console.log(profileNumber);
    }
  };
  const previousProfile = (profs) => {
    if (profs.length > 0 && profileNumber > 0) {
      setProfileNumber(--profileNumber);
      console.log(profileNumber);
    }
  };

  const display = (profs) => (
    <div className='flex-rewind'>
      <p id='previous-btn' onClick={(e) => previousProfile(profs)}>
        <i className='fas fa-chevron-left fa-5x'></i>
      </p>
      <div className='inside'>
        <br />
        <div>
          <img id='img-main' src={profs[profileNumber].photo} alt=''></img>
        </div>

        <p id='person'>
          {profs[profileNumber].name} - {profs[profileNumber].age} Y/O
        </p>
        <p id='age'></p>
        <p className='about'>About me:</p>
        <p id='description'>{profs[profileNumber].description}</p>
        <p id='description'>
          Gender: {profs[profileNumber].sex === "male" ? "male" : "female"}
        </p>
        <p id='description'>
          PreferenceMale:{" "}
          {profs[profileNumber].preferenceMale ? "true" : "false"}
        </p>
        <p id='description'>
          PreferenceFemale:{" "}
          {profs[profileNumber].preferenceFemale ? "true" : "false"}
        </p>
        <div className='img-relative'>
          <div className='flex-like-message'>
            <Link
              to={{
                pathname: "/chat",
                state: { profileToChat: profs[profileNumber].user },
              }}
              className='message-icon'
            >
              <div className='pointer' onClick={(e) => history.push("/chat")}>
                <i className='far fa-comments fa-2x'></i>{" "}
                <span className='pointer'>Chat</span>
              </div>
            </Link>
            <div className='heart-icon'>
              <i className='far fa-heart fa-2x'></i> <span> Favourites</span>
            </div>
          </div>
        </div>
      </div>
      <p id='next-btn' onClick={(e) => nextProfile(profs)}>
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
          {auth.isAuthenticated && matchingProfiles.length > 0
            ? display(matchingProfiles)
            : display(profiles)}
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
