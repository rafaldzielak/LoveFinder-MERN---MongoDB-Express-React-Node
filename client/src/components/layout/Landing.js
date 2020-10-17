import React, { Fragment } from "react";
import People from "../people/People";
import SidebarMsg from "../people/SidebarMsg";
import SidebarMsg2 from "../people/SidebarMsg2";
import Footer from "./Footer";

const Landing = () => {
  return (
    <Fragment>
      {/* <PeopleActions /> */}
      <div className='containerUser'>
        <div className='people-msg-flex'>
          <SidebarMsg2 />
          <People />
          <SidebarMsg />
        </div>
        <Footer />
      </div>
    </Fragment>
  );
};

export default Landing;
