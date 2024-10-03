import React, { useEffect, useState } from "react";
import { Button as MuiButton } from "@mui/material";
import { Button, Modal } from "react-bootstrap";
import InfoIcon from "../../../assets/info-circle-fill.svg";
import axios from "axios";

function InfoNotificationModal({ data }) {
  const [show, setShow] = useState(false);
  const [mailDetail, setMailDetail] = useState(null);

  const handleClose = () => {
    console.log("Close");
    setShow(false);
  };
  const handleShow = async () => {
    setShow(true);
    try {
      const response = await axios.get(
        `http://localhost:8081/api/customer/mail-detail`,
        { params: { mailId: data.mailId } }
      );
      console.log(response.data);
      setMailDetail(response.data);
    } catch (error) {
      console.log(error);
    }
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
          <Modal.Title style={{ color: "black" }}>Mail Details..</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-12">
            <div className="col-span-5">Recipient Name:</div>
            <div className="col-span-7 mb-1">
              {mailDetail?.recipientName || ""}
            </div>
            <div className="col-span-5">Recipient Address:</div>
            <div className="col-span-7 mb-1">
              {mailDetail?.destinationAddress || ""}
            </div>
            <div className="col-span-5">Mail Type:</div>
            <div className="col-span-7 mb-1">{mailDetail?.mailType || ""}</div>
            <div className="col-span-5">Date Posted:</div>
            <div className="col-span-7 mb-1">
              {mailDetail?.datePosted || ""}
            </div>
            <div className="col-span-5">Status:</div>
            <div className="col-span-3 mb-1 bg-[#fef08a]">
              {mailDetail?.status || ""}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* <div style={{ textAlign: "left", fontWeight: "bold" }}>
            
          </div> */}
          <Button
            variant="secondary"
            style={{ backgroundColor: "#334155" }}
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InfoNotificationModal;
