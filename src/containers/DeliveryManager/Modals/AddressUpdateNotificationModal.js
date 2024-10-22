import React, { useEffect, useState } from "react";
import { Button as MuiButton, TextField } from "@mui/material"; // MUI components for button and text field
import { Button, Modal } from "react-bootstrap";
import EditIcon from "../../../assets/pencil-fill.svg"; // Importing the edit icon imag
import axios from "axios";

// Functional component for Address Update Notification Modal
const AddressUpdateNotificationModal = ({ data }) => {
  const [show, setShow] = useState(false); // State to control modal visibility
  const [mailInfo, setMailInfo] = useState(null); // State to store fetched mail information
  const [hasUpdated, setHasUpdated] = useState(false); // State to track if address update is succ
  const [newAddress, setNewAddress] = useState(""); // State to store new address input
  // Function to close the modal
  const handleClose = () => {
    setShow(false);
  };
  // Function to handle the address update submission
  const handleUpdateClose = async () => {
    try {
      console.log("data", data);
      console.log("newAddress", newAddress);
      // Sending POST request to update the address for the specified mai
      const response = await axios.post(
        `https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/api/delivery-manager/return-mail/address-update/update`,
        {
          mailId: data.mailId,
          customerId: data.customerId,
          undeliverableId: data.undeliverableId,
          newAddress: newAddress,
          notificationId: data.notificationId,
        },
        { withCredentials: true }
      );
      // If the request is successful, mark the update as done and close
      if (response.status === 200) {
        setHasUpdated(true);
        setShow(false);
      }
    } catch (error) {
      console.error("Error updating address", error);
    }
  };
  // Function to show the modal and fetch mail data
  const handleShow = () => {
    fetchData();
    setShow(true);
  };
  // Function to fetch undeliverable mail details
  const fetchData = async () => {
    try {
      // Fetching mail information using the mailId passed from the `data
      const response = await axios.get(
        `https://sep12-backend-byd6esdhhkg8dffq.canadacentral-01.azurewebsites.net/api/delivery-manager/return-mail/get-undeliverable-mail/${data.mailId}`,
        { withCredentials: true }
      );
      setMailInfo(response.data); // Store the fetched mail information
      console.log("This is data", response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  return (
    <>
      {/* Conditionally render 'DONE' if the address update was successful */}
      {hasUpdated ? (
        <div
          className=" bg-black p-[4px] max-h-[20px]"
          style={{
            color: "#FFF",
            color: "#FFF",
            display: "inline",
          }}
        >
          DONE
        </div>
      ) : (
        // Button to trigger the modal and address update
        <Button
          title="Edit Address"
          style={{
            border: "none",
            background: "#fcd34d",
            minWidth: "35px",
            marginRight: "10px",
            outline: "none",
            boxShadow: "none",
          }}
          onClick={handleShow}
        >
          <img src={EditIcon} alt="editIcon" /> {/* Edit icon */}
        </Button>
      )}
      {/* Modal to display address update form */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static" //initially was ="static"
        keyboard={false} // Disable closing with keyboard (ESC)
        dialogClassName="modal-90w" // Custom class for modal width
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>
            Update Address...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Display current mail info if data is available, otherwise show loading */}
          {mailInfo ? (
            <>
              <div
                className="mb-[10px] flex flex-row"
                style={{ color: "grey" }}
              >
                Current Address:{" "}
                <div className="flex flex-row" style={{ color: "black" }}>
                  <div style={{ color: "white" }}>d</div>
                  {mailInfo.destinationAddress}
                </div>
              </div>
              <div className="mb-[10px]" style={{ color: "grey" }}>
                New Address:
              </div>
            </>
          ) : (
            <p>Loading...</p> // Loading message while fetching data
          )}
          <div>
            {/* Text field to input the new address */}
            <TextField
              InputLabelProps={{
                style: { fontSize: 13 }, // Custom style for input label
              }}
              style={{ minWidth: 400 }}
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)} // Update state when input changes
            ></TextField>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* Cancel button to close the modal */}
          <Button
            style={{
              backgroundColor: "#000",
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          {/* Update button to submit the address update */}
          <Button
            style={{
              backgroundColor: "#fcd34d",
              borderColor: "yellow",
              color: "black",
            }}
            onClick={handleUpdateClose}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddressUpdateNotificationModal;
