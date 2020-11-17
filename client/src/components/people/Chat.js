import React, { Fragment, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { getMessages, sendMessage } from "../../actions/profile.js";
import Alert from "../layout/Alert";
import SidebarMsg from "../people/SidebarMsg";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import socketIOClient from "socket.io-client";

const Chat = ({ location, auth, profile, getMessages, sendMessage, setAlert }) => {
  const { profileToChat } = location.state || "no profileToChat";
  const { loading, messages } = profile;

  const socket = useRef("");

  useEffect(() => {
    socket.current = socketIOClient();

    socket.current.on("message", (message) => {
      console.log(message);
    });
    socket.current.on("chatMessage", (message) => {
      setTimeout(() => {
        getMessages({ fromUser: auth.user._id, toUser: profileToChat });
      }, 500);
    });
    if (auth.user) {
      const fromUser = auth.user._id;
      socket.current.emit("joinRoom", { fromUser, profileToChat });
    }
  }, []);

  let messagesEnd = "";
  const scrollToBottom = () => {
    messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  let [showDefaultMessages, setShowDefaultMessages] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated && !loading) {
      getMessages({ fromUser: auth.user._id, toUser: profileToChat });
    }
    scrollToBottom();
  }, [auth.isAuthenticated, loading, profileToChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const [formData, setFormData] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!auth.user) {
      setAlert("Log in to send/receive messages", "danger");
      setAlert("This is an example of chat messages:", "success");
      setShowDefaultMessages(true);
    } else if (!profile.name) {
      setAlert("Please create your profile to chat.", "danger");
      setAlert("This is an example of chat messages:", "success");
      setShowDefaultMessages(true);
    } else if (formData === "") {
      setAlert("Type a message", "danger");
    } else {
      socket.current.emit("chatMessage", formData); //emit message to server
      await sendMessage({ msg: formData, to: profileToChat });
      await getMessages({ fromUser: auth.user._id, toUser: profileToChat });
      setFormData("");
    }
  };

  return (
    <Fragment>
      <Alert></Alert>
      <div className='inside msg-flex margin-1'>
        <div className='msg-flex'>
          {messages &&
            messages.map((message, index) =>
              message.from === profileToChat ? (
                <div className='msg from-msg' key={index}>
                  {message.msg}
                </div>
              ) : (
                <div className='msg to-msg' key={index}>
                  {message.msg}
                </div>
              )
            )}
          <div style={{ float: "left", clear: "both" }} ref={(el) => (messagesEnd = el)}></div>

          {showDefaultMessages && !loading && (
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

              <button className='icon-save fabutton'>
                <i className='fas fa-paper-plane fa-3x'></i>
              </button>
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
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  messages: state.profile.messages,
  auth: state.auth,
  alert: state.alert,
});

export default withRouter(
  connect(mapStateToProps, {
    getMessages,
    setAlert,
    sendMessage,
  })(Chat)
);
