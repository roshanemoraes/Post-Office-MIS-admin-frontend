import React, { useEffect, useState } from "react";
import { Button as MuiButton } from "@mui/material";
import { Button, Modal } from "react-bootstrap";
import ViewRouteMap from "../../../components/Maps/ViewRouteMap";

function ViewRouteModal({ destinations }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .modal-90w {
        max-width: 90%;
        max-height: 50%;
      }
      .modal-90w .modal-content {
      max-height: 50%;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleClose = () => {
    console.log("Close");
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
    console.log(destinations);
  };
  return (
    <>
      <MuiButton
        // disabled={row.status === "Assigned" ? true : false}
        variant="contained"
        sx={{
          width: "40px",
          my: "0px",
          mb: "0px",
          mr: "10px",
          ml: "13px",
          backgroundColor: "#155e75",
          color: "white",
          px: 3,
          fontSize: "10px",
          borderRadius: "8px",
        }}
        onClick={handleShow}
      >
        View
      </MuiButton>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="modal-90w"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "blue" }}>
            Deliver Destinations . . .
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <ViewRouteMap destinations={destinations} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div style={{ textAlign: "left", fontWeight: "bold" }}>
            Destination Count: {destinations.length - 1}
          </div>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewRouteModal;
