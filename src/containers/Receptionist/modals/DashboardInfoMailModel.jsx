import React, { useEffect, useState } from "react";
import { Button as MuiButton } from "@mui/material";
import { Button, Modal } from "react-bootstrap";
import InfoIcon from "../../../assets/info-circle-fill.svg";

const DashboardInfoMailModel = ({ data }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    console.log("Close");
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <Button
        title="Info"
        style={{
          border: "none",
          background: "#6ee7b7",
          minWidth: "35px",
          marginRight: "10px",
          outline: "none",
          boxShadow: "none",
        }}
        onClick={handleShow}
      >
        <img src={InfoIcon} alt="infoIcon" />
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop={true} //initially was ="static"
        keyboard={false}
        dialogClassName="modal-60w"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>Mail Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-6">
            <div className="col-span-2" style={{ color: "grey" }}>
              <div style={{ marginBottom: "5px" }}>Recipient Name:</div>
              <div style={{ marginBottom: "5px" }}>Delivered To:</div>
              <div style={{ marginBottom: "5px" }}>Status:</div>

              <div style={{ marginBottom: "5px" }}>City:</div>
              <div style={{ marginBottom: "5px" }}>Zone:</div>
            </div>
            <div className="col-span-4">
              <div style={{ marginBottom: "5px" }}>{data.recipientName}</div>
              <div style={{ marginBottom: "5px" }}>
                {data.destinationAddress}
              </div>
              <div style={{ marginBottom: "5px" }}>{data.status}</div>
              <div style={{ marginBottom: "5px" }}>{data.city}</div>
              <div style={{ marginBottom: "5px" }}>{data.zone}</div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* <div style={{ textAlign: "left", fontWeight: "bold" }}>
            
          </div> */}
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DashboardInfoMailModel;
