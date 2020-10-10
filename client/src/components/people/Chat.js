import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  getMessages,
  getProfile,
  setLoading,
  clearMessages,
  sendMessage,
} from "../../actions/profile.js";
import { connect } from "react-redux";

const Chat = ({
  location,
  auth,
  profile,
  getMessages,
  sendMessage,
  getProfile,
  setLoading,
  clearMessages,
}) => {
  const { profileToChat } = location.state;
  const { loading, messages } = profile;

  useEffect(() => {
    // setLoading();
    console.log(location);
    console.log("messages: ");
    console.log(profile);
    // if (auth.isAuthenticated) {
    //   getProfile();
    // }
  }, [auth.isAuthenticated]);

  useEffect(() => {
    if (auth.isAuthenticated && !loading) {
      getMessages({ fromUser: auth.user._id, toUser: profileToChat });
    }
  }, [auth.isAuthenticated, loading]);

  const [formData, setFormData] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    await sendMessage({ msg: formData, to: profileToChat });
    await getMessages({ fromUser: auth.user._id, toUser: profileToChat });
  };

  return (
    <Fragment>
      <div className='inside msg-flex margin-1'>
        <div className='msg-flex'>
          {messages &&
            messages.map((message) =>
              message.from === profileToChat ? (
                <div className='msg from-msg'>
                  {message.msg}
                  {console.log(message.from)}
                </div>
              ) : (
                <div className='msg to-msg'>
                  {message.msg}
                  {console.log(message.from)}
                </div>
              )
            )}

          {!loading && messages.length === 0 && (
            <Fragment>
              <div className='msg from-msg'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus blanditiis
                placeat asperiores voluptate iusto officiis, alias at voluptates cupiditate
                doloribus.
              </div>
              <div className='msg to-msg'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non sunt, explicabo
                incidunt eaque asperiores tempore beatae quas harum saepe, unde aperiam inventore
                impedit error magni, quos quod sint ipsa doloremque.
              </div>
              <div className='msg from-msg'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus blanditiis
                placeat asperiores voluptate iusto officiis, alias at voluptates cupiditate
                doloribus.
              </div>
            </Fragment>
          )}
        </div>

        <div className='bottom-flex'>
          <form
            onSubmit={(e) => {
              onSubmit(e);
            }}>
            <div className='msg-write row input-field'>
              <input
                className='col s9'
                type='text'
                name='text'
                id='text'
                value={formData}
                onChange={(e) => setFormData(e.target.value)}
              />
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
  messages: PropTypes.array.isRequired,
  getMessages: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  messages: state.profile.messages,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getMessages,
  getProfile,
  setLoading,
  sendMessage,
  clearMessages,
})(Chat);
