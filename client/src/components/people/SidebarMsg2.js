import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const SidebarMsg = ({ auth }) => {
  console.log(auth);
  return <div className='msg-bar-left'>This is msg bar</div>;
};

SidebarMsg.propTypes = {};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(SidebarMsg);
