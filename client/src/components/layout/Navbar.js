import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'

export const Navbar = () => {
  return (
    <Fragment>
      <div class="upper-flex">

          <input type="hidden" name="startid" value="" class="delete-one" />

          <input type="submit" value="Delete This User" class="btn-light alert-confirm"/>

          <button class="btn-light alert-confirm" type="submit"> Delete All Users
          </button>

          <button class="btn-light" type="submit"> Add User </button>

        <a href="login" class="btn-light">Log In</a>
          <button class="btn-light show-liked"> Show Liked </button>
      </div>
      
    </Fragment>
  )
}

export default Navbar