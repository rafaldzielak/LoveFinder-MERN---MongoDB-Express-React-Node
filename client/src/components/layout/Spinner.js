import React, { Fragment } from "react";
import spinner from "./spinner.gif";

export default () => (
  <Fragment>
    <img
      className='img-main'
      src={spinner}
      // style={{ margin: "auto", display: "block" }}
      alt='Loading...'
    />
  </Fragment>
);
