import React, { Fragment, useEffect } from "react";
import { getFavProfiles, getProfile } from "../../actions/profile";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const Favourites = ({
  profile: { profiles, loading },
  auth,
  getFavProfiles,
  getProfile,
}) => {
  const { isAuthenticated } = auth;
  useEffect(() => {
    getProfile();
    getFavProfiles();
  }, [profiles.loading, getFavProfiles]);

  return (
    <Fragment>
      {isAuthenticated && !loading && (
        <div className='liked-profiles'>
          {profiles &&
            profiles.map((profile) => (
              <Link
                key={profile._id}
                to={{
                  pathname: "/chat",
                  state: { profileToChat: profile.user },
                }}
                className='liked-profile pointer'>
                <Fragment>
                  <img className='pointer' id='img-small' src={profile.photo} alt='' />
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
      )}
    </Fragment>
  );
};

Favourites.propTypes = {
  getFavProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getFavProfiles, getProfile })(Favourites);
