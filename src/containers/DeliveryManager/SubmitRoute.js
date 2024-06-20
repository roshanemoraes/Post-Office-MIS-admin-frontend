import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Button as MuiButton } from "@mui/material";
import DistanceMatrix from "../../components/Maps/DistanceMatrix";

function SubmitRoute({ rowData, destinations }) {
  const [show, setShow] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [optimumRoute, setOptimumRoute] = useState(null);

  const destinationList = destinations.map((destination) => ({
    lat: destination.lat,
    lng: destination.lng,
  }));

  const handleSetOptimumRoute = (data) => {
    console.log("Data: ", data);
    setOptimumRoute(data);
  };

  const handleClose = () => {
    console.log("Close");
    console.log(destinationList);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleGenerate = () => {
    setIsGenerated(true);
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
          mr: "0px",
          backgroundColor: "#000000",
          color: "white",
          px: 5,
          fontSize: "11px",
          borderRadius: "8px",
        }}
        onClick={handleShow}
      >
        Assign
      </MuiButton>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "red" }}>
            Generate Opt.Route for {rowData.postman_id} ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please check whether the delivery locations are indeed in the assigned
          zone of the postman. {rowData.des}
          <br />
          <br />
          <br /> To verify locations, click on the "Cancel" button.
          {isGenerated && (
            <div>
              <DistanceMatrix
                destinations={destinationList}
                onResponse={handleSetOptimumRoute}
              />
              <br />
              <br />
              <div style={{ fontSize: "22px", color: "blue" }}>Generated!</div>
              Optimum Route: {optimumRoute}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={isGenerated}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleGenerate}
            disabled={isGenerated}
          >
            Generate
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SubmitRoute;
