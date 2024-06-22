import React, { useEffect, useState } from "react";
import { Button as MuiButton } from "@mui/material";
import { Button, Modal, ModalHeader } from "react-bootstrap";
import axios from "axios";
import { latLng2Tile } from "google-map-react";

function AddressValidationModal({ formState, onValidationResult }) {
  const [show, setShow] = useState(false);
  const [validatedResponse, setValidatedResponse] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleClose = () => {
    setShow(false);
    setValidatedResponse({});
    setIsValid(false);
  };
  const handleAccept = () => {
    onValidationResult(validatedResponse);
    handleClose();
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
        // console.log(response.data);
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
          <Modal.Title style={{ color: "red", alignItems: "center" }}>
            Address Verification
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isValid &&
            validatedResponse.members &&
            Array.isArray(validatedResponse.members) && (
              <div>
                <div
                  style={{
                    color: "blue",
                    fontSize: "20px",
                    marginBottom: "0px",
                    marginTop: "10px",
                  }}
                >
                  Valid Address!
                </div>

                <br />
                <div>Address: {validatedResponse.textForm}</div>
                <div style={{ marginTop: "7px" }}>
                  Members:
                  {validatedResponse.members.map((member, index) => (
                    <div key={index}>
                      {index + 1}: {member}
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
                  color: "darkyellow",
                  fontSize: "20px",
                  marginBottom: "0px",
                  marginTop: "10px",
                }}
              >
                Invalid Address !!
              </div>
              <div
                style={{ marginTop: "25px", fontSize: "14px", color: "blue" }}
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
