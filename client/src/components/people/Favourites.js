import React, { Fragment, useEffect, useState } from "react";
import { getProfiles, getProfile, clearMessages, getFavProfiles } from "../../actions/profile";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, Redirect, useHistory } from "react-router-dom";

export const Favourites = ({
  profile: { profiles },
  auth,
  getFavProfiles,
  getProfile,
  clearMessages,
}) => {
  useEffect(() => {
    getFavProfiles();
  }, [profiles.loading]);

  return (
    <div className='liked-profiles'>
      {profiles &&
        profiles.map((profile) => (
          <Link
            to={{
              pathname: "/chat",
              state: { profileToChat: profile.user },
            }}
            className='liked-profile pointer'>
            <Fragment>
              <img id='img-small' src={profile.photo} alt='' />
              <br />
              {profile.name} - {profile.age} Y/O
            </Fragment>
          </Link>

          // <Link
          //     to={{
          //       pathname: "/chat",
          //       state: { profileToChat: profs[profileNumber].user },
          //     }}
          //     className='message-icon'>
          //     <div className='pointer' onClick={(e) => history.push("/chat")}>
          //       <i className='far fa-comments fa-2x'></i> <span className='pointer'>Chat</span>
          //     </div>
          //   </Link>
        ))}
    </div>
  );
};

Favourites.propTypes = {
  getFavProfiles: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getFavProfiles, getProfile, clearMessages })(Favourites);
