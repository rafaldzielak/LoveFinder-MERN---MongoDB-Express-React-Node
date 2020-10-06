import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Chat = (profile) => {
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
              <div className="pointer col s2"><i class="fas fa-paper-plane fa-3x"></i></div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

Chat.propTypes = {};

export default Chat;
