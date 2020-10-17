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
  profile.messages.forEach((message) => {
    allMessages.unshift(message);
  });
  if (profile.messages && profile.user) {
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
          lastMessages.push(message);
          break;
        }
      }
    });
    console.log("Execution time: " + (Date.now() - start));
  }

  return (
    <div className='msg-bar'>
      <p className='about bor-bot'>Messages:</p>
      {/* {console.log(profile.messages)} */}
      {profile.messages &&
        peopleArray.map((person) => (
          <Link
            to={{
              pathname: "/chat",
              state: { profileToChat: person.personToChat },
            }}>
            <div className='msg-bar-item'>
              <img src={person.photo} className='photo-small' />{" "}
              <p className='sidebar-message'>{person.lastMessage}</p>
            </div>
          </Link>
        ))}
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
