import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'

export const PeopleActions = () => {
  return (
    <Fragment>
      <div class="upper-flex">
          <button class="btn-light alert-confirm" type="submit"> Delete This User</button>
          <button class="btn-light alert-confirm" type="submit"> Delete All Users</button>
          <button class="btn-light" type="submit"> Add User </button>
          <button class="btn-light show-liked"> Log In </button>
           <Link to="/register"><button class="btn-light show-liked">Register</button></Link> 
          <button class="btn-light show-liked"> Show Liked </button>
      </div>
      
    </Fragment>
  )
}

export default PeopleActions