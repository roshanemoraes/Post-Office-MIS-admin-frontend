import React, { useEffect, useState } from "react";
import { Button as MuiButton } from "@mui/material";
import { Button, FormCheck, Modal, ModalHeader } from "react-bootstrap";
import axios from "axios";

function AddressValidationModal({ formState, onValidationResult }) {
  const [show, setShow] = useState(false);
  const [validatedResponse, setValidatedResponse] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [selectedCheckboxData, setSelectedCheckboxData] = useState(null);

  const handleClose = () => {
    setShow(false);
    setValidatedResponse({});
    setIsValid(false);
    setSelectedCheckboxData(null);
  };
  const handleAccept = () => {
    console.log(selectedCheckboxData);
    onValidationResult(validatedResponse);
    handleClose();
    setSelectedCheckboxData(null);
  };

  const validationResult = () => {
    setShow(true);
    setValidatedResponse({});
    setIsValid(false);
    const data = {
      houseNumber: formState.recipientHouseNumber,
      city: formState.recipientCity,
      zone: formState.recipientPostalZone,
    };
    axios
      .post("http://localhost:8081/api/receptionist/address/validate", data)
      .then((response) => {
        console.log("validation result came, success!");
        setValidatedResponse(response.data);
        setIsValid(true);
        setShow(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleShow = () => {
    setShow(true);
    console.log(formState.recipientHouseNumber);
    console.log("Show");
  };

  const handleCheckboxChange = (customerId) => {
    setSelectedCheckboxData(customerId);
  };

  return (
    <>
      <MuiButton
        variant="contained"
        sx={{
          my: "10px",
          mb: "10px",
          mr: "0px",
          ml: "32px",
          backgroundColor: "#852318",
          color: "white",
          px: 2,
          fontSize: "10px",
          borderRadius: "6px",
          alignSelf: "flex-start",
        }}
        onClick={validationResult}
      >
        Verify Address
      </MuiButton>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              color: "blue",
              alignItems: "center",
            }}
          >
            <div style={{ color: "#0369a1" }}>Address Verification</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isValid &&
            validatedResponse.members &&
            Array.isArray(validatedResponse.members) && (
              <div>
                <div
                  style={{
                    color: "#84cc16",
                    fontSize: "20px",
                    marginBottom: "0px",
                    marginTop: "10px",
                    fontWeight: "bold",
                  }}
                >
                  Valid Address!
                </div>

                <br />
                <div style={{ fontWeight: "bold" }}>Address: </div>
                <div>{validatedResponse.textForm}</div>
                <div style={{ marginTop: "12px" }}>
                  <div
                    className="grid sm:grid-cols-12 xs:grid-cols-12 "
                    style={{ fontWeight: "bold", marginBottom: "1px" }}
                  >
                    <div className="sm:col-span-9 xs:col-span-9">Members:</div>
                    <div
                      className="sm:col-span-2 xs:col-span-2"
                      style={{
                        justifyContent: "center",
                      }}
                    >
                      Id
                    </div>
                    <div
                      className="sm:col-span-1 xs:col-span-1"
                      style={{
                        display: "flex",
                        alignSelf: "center",
                        justifyContent: "left",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-bell-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
                      </svg>
                    </div>
                  </div>
                  {validatedResponse.members.map((member, index) => (
                    <div key={index}>
                      <div className="grid sm:grid-cols-12 xs:grid-cols-12">
                        <div className="sm:col-span-9 xs:col-span-9">
                          {member.name}
                        </div>
                        <div className="sm:col-span-2 xs:col-span-2">
                          {member.customerId}
                        </div>
                        <div className="sm:col-span-1 xs:col-span-1">
                          {member.customerId != "unreg" ? (
                            <FormCheck
                              type="checkbox"
                              id={`checkbox-${index}`}
                              label=""
                              checked={
                                selectedCheckboxData === member.customerId
                              }
                              onChange={() =>
                                handleCheckboxChange(member.customerId)
                              }
                            />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  style={{ marginTop: "30px", color: "blue", fontSize: "14px" }}
                >
                  Press 'Accept' to use this Address, 'Reject' to discard.
                </div>
              </div>
            )}
          {!isValid && (
            <div>
              <div
                style={{
                  color: "red",
                  fontSize: "20px",
                  marginBottom: "0px",
                  marginTop: "10px",
                  fontWeight: "bold",
                }}
              >
                Invalid Address !!
              </div>
              <div
                style={{ marginTop: "10px", fontSize: "14px", color: "blue" }}
              >
                Please Check Again.
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Reject
          </Button>
          <Button disabled={!isValid} variant="primary" onClick={handleAccept}>
            Accept
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddressValidationModal;
