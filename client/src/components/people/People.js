import React, { Fragment, useEffect, useState } from "react";
import {
  getProfiles,
  getProfile,
  clearMessages,
  toggleFavourites,
  setLoading,
} from "../../actions/profile";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { setAlert } from "../../actions/alert";

import Alert from "../../components/layout/Alert";

export const People = ({
  profile: { profile, profiles, loading },
  getProfiles,
  getProfile,
  toggleFavourites,
  auth,
  clearMessages,
  setLoading,
  setAlert,
}) => {
  const [matchingProfiles, setMatchingProfiles] = useState([]);
  const [isloadingPicture, setIsLoadingPicture] = useState(false);

  const history = useHistory();
  useEffect(() => {
    clearMessages();
    getProfiles();
  }, [getProfiles, clearMessages]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      getProfile();
    }
  }, [auth.loading, getProfile, auth.isAuthenticated]);

  useEffect(() => {
    if (profile) {
      setMatchingProfiles(
        profiles.filter((p) => {
          if (p._id === profile._id) return false;
          if (
            (p.sex === "male" &&
              profile.preferenceMale === true &&
              (profile.sex === "male" ? p.preferenceMale : p.preferenceFemale)) ||
            (p.sex === "female" &&
              profile.preferenceFemale === true &&
              (profile.sex === "female" ? p.preferenceFemale : p.preferenceMale))
          ) {
            return true;
          } else return false;
        })
      );
    }
  }, [loading, profile, profiles]);
  useEffect(() => () => setLoading(), [setLoading]);
  useEffect(
    () => () => {
      clearMessages();
    },
    []
  );

  let [profileNumber, setProfileNumber] = useState(0);

  const nextProfile = (profs) => {
    if (profs.length > profileNumber + 1) {
      setProfileNumber(++profileNumber);
      const isLast = false;
      return !isLast;
    }
  };
  const previousProfile = (profs) => {
    if (profs.length > 0 && profileNumber > 0) {
      setProfileNumber(--profileNumber);
    }
  };

  const checkFavourites = (profile) => {
    // console.log("CheckFavo");
    if (auth.user && profile.likedBy.includes(auth.user._id)) {
      // console.log("CheckFavo: TRUE");
      return true;
    } else {
      // console.log("CheckFavo: FALSE");
      return false;
    }
  };

  const changeHeartIcon = () => {
    let heartIcon = document.querySelector(".fa-heart");
    if (heartIcon.classList.contains("far")) heartIcon.className = "fas fa-heart fa-2x";
    else if (heartIcon.classList.contains("fas")) heartIcon.className = "far fa-heart fa-2x";
  };

  const changeFavourites = async (profs) => {
    if (!auth.user) {
      setAlert("Log in To Add Profiles to Favourites", "danger");
    } else {
      await toggleFavourites({ profileIdToLike: profs[profileNumber]._id });
      getProfiles();
    }
  };

  var picture = document.getElementById("img-main");
  if (picture) {
    picture.onload = () => {
      setIsLoadingPicture(false);
    };
  }

  const display = (profs) => (
    <div className='flex-rewind'>
      <p id='previous-btn' onClick={(e) => previousProfile(profs)}>
        <i className='fas fa-chevron-left fa-3x'></i>
      </p>
      <div className='inside'>
        <br />
        <div>
          <img
            id='img-main'
            style={isloadingPicture ? { visibility: "hidden" } : { visibility: "visible" }}
            src={profs[profileNumber].photo}
            alt=''></img>
        </div>

        <p id='person'>
          {profs[profileNumber].name} - {profs[profileNumber].age} Y/O
        </p>
        <p className='about'>About me:</p>
        <p id='description'>{profs[profileNumber].description}</p>
        <div className='img-relative'>
          <div className='flex-like-message'>
            <Link
              to={{
                pathname: "/chat",
                state: { profileToChat: profs[profileNumber].user },
              }}
              className='message-icon'>
              <div className='pointer' onClick={(e) => history.push("/chat")}>
                <i className='far fa-comments fa-2x'></i>
                {/* <span className='pointer select-disable'> Chat</span> */}
              </div>
            </Link>
            <div className='heart-icon ' onClick={(e) => changeFavourites(profs)}>
              <i
                className={
                  checkFavourites(profs[profileNumber])
                    ? "fas fa-heart fa-2x"
                    : "far fa-heart fa-2x"
                }></i>
              {/* <span className='select-disable pointer'> Favourites</span> */}
            </div>
          </div>
        </div>
      </div>
      <p
        id='next-btn'
        onClick={(e) => {
          nextProfile(profs) && setIsLoadingPicture(true);
        }}>
        <i className='fas fa-chevron-right fa-3x'></i>
      </p>
    </div>
  );

  return (
    <Fragment>
      {loading && <div>LOADING</div>}
      {!loading && profiles.length > 0 && profileNumber >= 0 && (
        <Fragment>
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
  toggleFavourites: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  setLoading: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getProfiles,
  getProfile,
  clearMessages,
  toggleFavourites,
  setLoading,
  setAlert,
})(People);
