import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <Fragment>
      <nav>
        <div className='nav-wrapper blue-grey darken-3'>
          <div className='left'>
            <Link to='/' className='brand-logo'>
              LoveFinder
            </Link>
          </div>

          <ul id='nav-mobile' className='right hide-on-med-and-down'>
            <li>
              <Link to='/register'>Register</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
