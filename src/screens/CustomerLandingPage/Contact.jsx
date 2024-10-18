import React from "react";
import { CONTACT } from "../CustomerLandingPage/Constants";
import Contactprofileimg from "./../CustomerLandingPage/Contactprofileimg.jpg";
import RoshaneImg from "./../CustomerLandingPage/Roshane.jpg";
import KokilaImg from "./../CustomerLandingPage/kokila.jpg";
import TharinduImg from "./../CustomerLandingPage/Tharindu.jpg";

import ContactCard from "./../CustomerLandingPage/ContactCard";
const Contact = () => {
  return (
    <div className="border-b border-l-neutral-900 pb-20">
      <h1 className="mt-20 mb-10 text-center text-4xl">CONTACT US</h1>
      <div className="grid grid-cols-3 mx-[50px] gap-3">
        <div className="col-span-1">
          <ContactCard
            backgroundColor={"#cbd5e1"}
            title={"ADAM ROSHANE"}
            iconSrc={RoshaneImg}
            gitUserName={"roshanemoraes"}
            email={"adam.21@cse.mrt.ac.lk"}
            linkedInId={"adam-moraes"}
          />
        </div>

        <div className="col-span-1">
          <ContactCard
            backgroundColor={"#cbd5e1"}
            title={"THARINDU DESHAN"}
            gitUserName={"Tharindu-Deshan"}
            email={"deshantharindu63@gmail.com"}
            linkedInId={"tharindu-deshan-260b6027a"}
            iconSrc={TharinduImg}
          />
        </div>
        <div className="col-span-1">
          <ContactCard
            backgroundColor={"#cbd5e1"}
            title={"KOKILA MEDDAWITAGE"}
            gitUserName={"KokilaMeddawitage"}
            email={"kokila.21@cse.mrt.ac.lk"}
            linkedInId={"kokila-meddewitage-5a1193270"}
            iconSrc={KokilaImg}
          />
        </div>
      </div>
      <div className="h-[20px]"></div>
    </div>
  );
};

export default Contact;
