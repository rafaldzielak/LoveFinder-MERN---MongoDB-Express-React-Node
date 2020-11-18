import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Showcase = ({ auth }) => {
  return (
    <div className='showcase'>
      <div className='showcase-desc'>
        <h1>LoveFinder</h1>
        <h4>Find Your True Love</h4>
        {/* <Link to='/people'>View profiles</Link> */}
      </div>
      <br />
      {console.log("page loaded")}
      {!auth.isAuthenticated && (
        <Fragment>
          <Link to='/login'>
            <div className='showcase-desc button small'>Login</div>
          </Link>

          <Link to='/register'>
            <div className='showcase-desc button small'>Register</div>
          </Link>
        </Fragment>
      )}

      <br />

      <Link to='/people'>
        <div className='showcase-desc button'>View Profiles</div>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Showcase);
