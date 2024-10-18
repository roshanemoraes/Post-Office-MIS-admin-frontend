import React from "react";
import { Card, CardBody } from "react-bootstrap";
import linkedinIcon from "../../assets/bxl-linkedin-square.svg";
import emailIcon from "../../assets/bxs-envelope.svg";
import githubIcon from "../../assets/bxl-github.svg";

const ContactCard = ({
  backgroundColor,
  title,
  value,
  iconSrc,
  gitUserName,
  linkedInId,
  email,
}) => {
  return (
    <Card
      style={{
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        borderColor: "transparent",
        backgroundColor: "#fff",
        padding: "10px 10px 60px 10px", //t,r,b,l
        borderRadius: "10px",
      }}
    >
      <CardBody
        style={{
          fontFamily: "sans-serif",
          backgroundColor: backgroundColor,
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <div className="grid grid-cols-2">
          <div className="col-span-2">
            <div className="flex justify-center h-[100%] align-items-center">
              <img
                src={iconSrc}
                alt="Profile"
                style={{
                  width: "100px", // Set a fixed width
                  height: "100px", // Set a fixed height
                  borderRadius: "50%", // Make the image round
                  objectFit: "cover", // Cover the area while maintaining aspect ratio
                }}
              />
              <div
                className="flex justify-center align-items-center"
                style={{
                  color: "#7f1d1d",
                  marginBottom: "4px",
                  marginLeft: "15px",
                  fontSize: "24px",
                }}
              >
                {title}
              </div>
            </div>

            <div
              className="flex justify-center align-items-center text-[#0c0a09]"
              style={{ fontSize: "18px", marginTop: "10px" }}
            >
              <div className="flex justify-center mt-3">
                <a
                  href={`https://www.linkedin.com/in/${linkedInId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={linkedinIcon}
                    alt="LinkedIn"
                    style={{
                      width: "24px",
                      height: "24px",
                      margin: "0 10px",
                    }}
                  />
                </a>
                <a
                  href={`mailto:${email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={emailIcon}
                    alt="Email"
                    style={{
                      width: "24px",
                      height: "24px",
                      margin: "0 10px",
                    }}
                  />
                </a>
                <a
                  href={`https://github.com/${gitUserName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={githubIcon}
                    alt="Git"
                    style={{
                      width: "24px",
                      height: "24px",
                      margin: "0 10px",
                    }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ContactCard;
