import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";
import { connect } from "react-redux";

export const Navbar = ({ logout, auth }) => {
  const authLinks = (
    <Fragment>
      <li>
        <Link to='/favourites'>Favourites</Link>
      </li>
      <li>
        <Link to='/profile'>My Profile</Link>
      </li>
      <li>
        <a
          href='#!'
          onClick={() => {
            logout();
            window.location.href = "/";
          }}>
          Logout
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

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
            {!auth.loading && auth.isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
