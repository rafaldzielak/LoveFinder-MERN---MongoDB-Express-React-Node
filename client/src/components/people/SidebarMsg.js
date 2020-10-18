import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllMessages } from "../../actions/profile.js";
import { Link } from "react-router-dom";

const SidebarMsg = ({ auth, profile, profiles, getAllMessages }) => {
  useEffect(() => {
    if (auth.isAuthenticated) {
      getAllMessages({ fromUser: auth.user._id });
    }
  }, [auth, getAllMessages]);

  const start = Date.now();
  // const usersToChat = [...new Set()]
  let peopleArray = [];
  let lastMessages = [];
  let peopleToChat = new Set();
  let allMessages = [];
  let i = 0;

  if (profile.messages && profile.user) {
    profile.messages.forEach((message) => {
      allMessages.unshift(message);
    });
    profile.messages.forEach((message) => {
      peopleToChat.add(message.to);
      peopleToChat.add(message.from);
      i++;
    });
    peopleToChat.delete(profile.user._id);

    peopleToChat.forEach((personToChat) => {
      for (const prof of profiles) {
        i++;
        if (prof.user === personToChat) {
          peopleArray.push({ personToChat, photo: prof.photo, name: prof.name });
        }
      }

      for (const message of allMessages) {
        i++;
        if (message.to === personToChat || message.from === personToChat) {
          peopleArray[peopleArray.length - 1].lastMessage = message.msg;
          peopleArray[peopleArray.length - 1].lastMessageDate = message.date;
          lastMessages.push(message);

          break;
        }
      }
    });
    peopleArray.sort((a, b) => new Date(b.lastMessageDate) - new Date(a.lastMessageDate));
  }

  return (
    <div className='msg-bar hide-on-med-and-down'>
      <p className='about bor-bot'>Chat:</p>
      {profile.messages && profile.messages.length > 0 ? (
        peopleArray.map((person, index) => (
          <Link
            key={index}
            to={{
              pathname: "/chat",
              state: { profileToChat: person.personToChat },
            }}>
            <div className='msg-bar-item'>
              <img src={person.photo} className='photo-small' />{" "}
              <p className='sidebar-message'>{person.lastMessage}</p>
            </div>
          </Link>
        ))
      ) : (
        <div className='log-in-message'>Log in to see the chat.</div>
      )}
    </div>
  );
};

SidebarMsg.propTypes = {
  auth: PropTypes.object.isRequired,
  getAllMessages: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile.profile,
  profiles: state.profile.profiles,
});

export default connect(mapStateToProps, { getAllMessages })(SidebarMsg);
