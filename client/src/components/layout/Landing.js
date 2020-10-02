import React, { Fragment } from "react";
import PeopleActions from "../people/PeopleActions";
import People from "../people/People";
import Footer from "./Footer";

const Landing = () => {
  return (
    <Fragment>
      <PeopleActions />
      <div className='container'>
        <People />
        <Footer />
      </div>
    </Fragment>
  );
};

export default Landing;
