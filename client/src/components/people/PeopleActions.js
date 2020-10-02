import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export const PeopleActions = () => {
  return (
    <Fragment>
      <div className='upper-flex'>
        <button className='btn-light alert-confirm' type='submit'>
          {" "}
          Delete This User
        </button>
        <button className='btn-light alert-confirm' type='submit'>
          {" "}
          Delete All Users
        </button>
        <button className='btn-light' type='submit'>
          {" "}
          Add User{" "}
        </button>
        <button className='btn-light show-liked'> Show Liked </button>
      </div>
    </Fragment>
  );
};

export default PeopleActions;
