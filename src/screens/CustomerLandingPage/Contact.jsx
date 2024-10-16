import React from "react";
import { CONTACT } from "../CustomerLandingPage/Constants";

const Contact = () => {
  return (
    <div id="contact-us" className="border-b border-l-neutral-900 pb-20">
      <h1 className="my-10 text-center text-4xl">CONTACT US</h1>
      <div className="text-center tracking-tighter">
        <p className="my-4">{CONTACT.address}</p>
        <p className="my-4">{CONTACT.phoneNo}</p>
        <a href="mailto:adam.21@cse.mrt.ac.lk" className="border-b">
          {CONTACT.email}
        </a>
      </div>
    </div>
  );
};

export default Contact;
