import React, { useEffect, useState } from "react";
import { Button as MuiButton } from "@mui/material";
import { Button, Modal } from "react-bootstrap";
import InfoIcon from "../../../assets/info-circle-fill.svg";

function InfoReturnMailModal({ data }) {
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
        dialogClassName="modal-90w"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>Mail Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div style={{ marginBottom: "5px" }}>
              Customer ID: {data.customer_id}
            </div>
            <div style={{ marginBottom: "5px" }}>
              Delivered By: {data.deliveredBy}
            </div>
            <div style={{ marginBottom: "5px" }}>City: {data.city}</div>
            <div>Zone: {data.zone}</div>
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
}

export default InfoReturnMailModal;
