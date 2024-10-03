import React, { useEffect, useState } from "react";
import { Button as MuiButton, TextField } from "@mui/material";
import { Button, Modal } from "react-bootstrap";
import EditIcon from "../../../assets/pencil-fill.svg";
import axios from "axios";

const AddressUpdateNotificationModal = ({ data }) => {
  const [show, setShow] = useState(false);
  const [mailInfo, setMailInfo] = useState(null);
  const [hasUpdated, setHasUpdated] = useState(false);
  const [newAddress, setNewAddress] = useState("");

  const handleClose = () => {
    setShow(false);
  };
  const handleUpdateClose = async () => {
    try {
      console.log("data", data);
      console.log("newAddress", newAddress);
      const response = await axios.post(
        `http://localhost:8081/api/delivery-manager/return-mail/address-update/update`,
        {
          mailId: data.mailId,
          customerId: data.customerId,
          undeliverableId: data.undeliverableId,
          newAddress: newAddress,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setHasUpdated(true);
        setShow(false);
      }
    } catch (error) {
      console.error("Error updating address", error);
    }
  };

  const handleShow = () => {
    fetchData();
    setShow(true);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/delivery-manager/return-mail/get-undeliverable-mail/${data.mailId}`,
        { withCredentials: true }
      );
      setMailInfo(response.data);
      console.log("This is data", response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  return (
    <>
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
          <img src={EditIcon} alt="editIcon" />
        </Button>
      )}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static" //initially was ="static"
        keyboard={false}
        dialogClassName="modal-90w"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>
            Update Address...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            <p>Loading...</p>
          )}
          <div>
            <TextField
              InputLabelProps={{
                style: { fontSize: 13 },
              }}
              style={{ minWidth: 400 }}
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
            ></TextField>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            style={{
              backgroundColor: "#000",
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
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
