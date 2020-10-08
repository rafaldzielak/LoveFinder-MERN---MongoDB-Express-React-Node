import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { getMessages, getProfile } from "../../actions/profile.js";
import { connect } from "react-redux";

const Chat = ({ location, auth, profile, getMessages, getProfile }) => {
  const { profileToChat } = location.state;

  // useEffect(() => {
  //   console.log("BBBBBBBBB");
  //   if (auth.isAuthenticated) {
  //     console.log("AAAA");
  //     getProfile();
  //   }
  //   // getProfile();

  //   console.log("match.params:");
  //   // console.log(match.match.params);
  //   console.log(props);
  //   // console.log(profile);
  //   console.log(profileToChat);
  //   // getMessages({profileToChat, profile._id});
  //   // console.log(profile.messages);
  // }, [getProfile, getMessages, auth.loading]);

  useEffect(() => {
    console.log(location.state.profileToChat);
    if (auth.isAuthenticated) {
      getProfile();
      getMessages({ fromUser: auth.user._id, toUser: profileToChat })
    }
  }, [auth.isAuthenticated]);

  return (
    <Fragment>
      <div className='inside msg-flex margin-1'>
        <div className='msg-flex'>
          <div className='msg from-msg'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            blanditiis placeat asperiores voluptate iusto officiis, alias at
            voluptates cupiditate doloribus.
          </div>
          <div className='msg to-msg'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non sunt,
            explicabo incidunt eaque asperiores tempore beatae quas harum saepe,
            unde aperiam inventore impedit error magni, quos quod sint ipsa
            doloremque.
          </div>
          <div className='msg from-msg'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            blanditiis placeat asperiores voluptate iusto officiis, alias at
            voluptates cupiditate doloribus.
          </div>
        </div>

        <div className='bottom-flex'>
          <form>
            <div className='msg-write row input-field'>
              <input className='col s9' type='text' name='' id='' />
              <div className='pointer col s2'>
                <i className='fas fa-paper-plane fa-3x'></i>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

Chat.propTypes = {
  auth: PropTypes.object.isRequired,
  getMessages: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getMessages, getProfile })(Chat);
