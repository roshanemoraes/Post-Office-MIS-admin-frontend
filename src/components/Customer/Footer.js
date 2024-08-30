import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="min-h-[300px] bg-gradient-to-r from-gray-600  to-gray-800">
        <footer
          className=" text-white text-center py-5"
          style={{ fontSize: "20px" }}
        >
          <div className="grid grid-cols-6 mx-[50px]">
            <div className="col-span-2">Badge</div>
            <div className="col-span-1">
              <div className="flex flex-col items-start mb-[20px]">
                SERVICES
              </div>
              <div className="flex flex-col items-start text-[15px] space-y-2">
                <div>Subscribe</div>
                <div>Store</div>
                <div>Contact</div>
                <div>Advertise</div>
                <div>Submit</div>
                <div>Sample Issue</div>
                <div>Cancel Subscription</div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="flex flex-col items-start mb-[15px]">
                PRODUCTS
              </div>
              <div className="flex flex-col items-start text-[15px] space-y-2 mb-[20px]">
                <div>Postal Admin Portal</div>
                <div>Customer Portal</div>
                <div>Postman Assistant App</div>
              </div>
              <div className="flex flex-col items-start my-[15px]">SL POST</div>
              <div className="flex flex-col items-start text-[15px] space-y-2 mb-[50px]">
                <div>Terms & Conditions</div>
                <div>Privacy Policy</div>
              </div>
            </div>
            <div className="col-span-2">
              <div>GET IN TOUCH</div>
            </div>
          </div>
          <div>POST OFFICE MIS SEP - 2024</div>
          <div className="min-h-[120px]"></div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
