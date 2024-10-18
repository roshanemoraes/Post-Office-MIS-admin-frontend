import React from "react";
import { CONTACT } from "../CustomerLandingPage/Constants";
import Contactprofileimg from "./../CustomerLandingPage/Contactprofileimg.jpg";
import ContactCard from "./../CustomerLandingPage/ContactCard";
const Contact = () => {
  return (
    <div id="contact-us" className="border-b border-l-neutral-900 pb-20">
      <h1 className="my-10 text-center text-4xl">CONTACT US</h1>
      <div className="grid grid-cols-3 mx-[50px] gap-3">
        <div className="col-span-1">
          <ContactCard
            backgroundColor={"#ffffff"}
            title={"ADAMS ROSHANE"}
            value={"Linkedin"}
            iconSrc={Contactprofileimg}
          />
        </div>

        <div className="col-span-1">
          <ContactCard
            backgroundColor={"#ffffff"}
            title={"THARINDU DESHAN"}
            value={"Linkedin"}
            iconSrc={Contactprofileimg}
          />
        </div>
        <div className="col-span-1">
          <ContactCard
            backgroundColor={"#ffffff"}
            title={"KOKILA MEDDAWITAGE"}
            value={"Linkedin"}
            iconSrc={Contactprofileimg}
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
