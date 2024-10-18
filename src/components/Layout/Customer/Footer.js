import React from "react";
//import { Link } from "react-router-dom";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa"; // Importing icons
const Footer = () => {
  // WhatsApp and Email handler functions
  const openWhatsApp = () => {
    const whatsappNumber = "0765531092";
    window.open(`https://wa.me/${whatsappNumber}`, "_blank");
  };

  const openEmail = () => {
    const email = "kokilameddewitage@gmail.com";
    window.open(`mailto:${email}`, "_blank");
  };
  return (
    <>
      <div
        className="mx-[10px]"
        style={{
          minHeight: "300px",
          background: "linear-gradient(to bottom, #171622, #1E2F4E, #2D9F9C)",
        }}
      >
        <footer
          className=" text-white text-center py-5"
          style={{ fontSize: "20px" }}
        >
          <div className="grid grid-cols-6 mx-[50px]">
            <div className="col-span-2">Badge</div>
            <div className="col-span-1">
              <div className="flex flex-col items-start mb-[30px]">
                SERVICES
              </div>
              <div className="flex flex-col items-start text-[15px] space-y-6 cursor-pointer">
                <a
                  href="https://slpost.gov.lk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline text-white"
                >
                  Information
                </a>
                <a
                  href="https://slpost.gov.lk/services/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline text-white"
                >
                  Services
                </a>
                <a
                  href="https://slpost.gov.lk/about-us/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline text-white"
                >
                  About Us
                </a>
                <a
                  href="https://slpost.gov.lk/contact-us/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline text-white"
                >
                  Contact
                </a>
              </div>
            </div>
            <div className="col-span-1">
              <div className="flex flex-col items-start mb-[25px]">
                PRODUCTS
              </div>
              <div className="flex flex-col items-start text-[15px] space-y-6 mb-[20px]">
                <div>Postal Admin Portal</div>
                <div>Customer Portal</div>
                <div>Postman Assistant App</div>
              </div>

              <div className="flex flex-col items-start my-[15px] mt-[20px] mb-[25px]">
                SL POST
              </div>
              <div className="flex flex-col items-start text-[15px] space-y-6 mb-[50px]">
                <div>Terms & Conditions</div>
                <div>Privacy Policy</div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex flex-col items-center">
                <div className="mb-2">GET IN TOUCH</div>
                <div className="flex flex-col space-y-4 mt-2">
                  {/* WhatsApp Icon */}
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={openWhatsApp}
                  >
                    <FaWhatsapp size={25} />
                    <span className="text-[15px]">WhatsApp</span>
                  </div>
                  {/* Email Icon */}
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={openEmail}
                  >
                    <FaEnvelope size={25} />
                    <span className="text-[15px]">Email</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{ fontWeight: "bold", marginTop: "40px", fontSize: "23px" }}
          >
            POST OFFICE MIS SEP - 2024
          </div>
          <div className="min-h-[50px]"></div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
