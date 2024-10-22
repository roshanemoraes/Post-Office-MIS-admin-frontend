import React, { useEffect, useState } from "react"; // Import necessary React hooks
import { Button as MuiButton } from "@mui/material"; // Import Material UI button
import { Button, Modal } from "react-bootstrap"; // Import Bootstrap components
import ViewRouteMap from "../../../components/Maps/ViewRouteMap"; // Import custom component to display route map

// Functional component to display a modal with route information
function ViewRouteModal({ destinations }) {
  const [show, setShow] = useState(false); // State to manage modal visibility
  // to dynamically create and append custom styles for the modal
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .modal-90w {
        max-width: 90%; // Set maximum width of the modal
        max-height: 50%; // Set maximum height of the modal
      }
      .modal-90w .modal-content {
      max-height: 50%;  // Set maximum height for the modal content
      }
    `;
    document.head.appendChild(style); // Append the style to the document head
    // Cleanup function to remove styles on component unmount
    return () => {
      document.head.removeChild(style);
    };
  }, []); // Empty dependency array to run effect only on mount and unmount
  // Function to handle modal close action
  const handleClose = () => {
    console.log("Close");
    setShow(false); // Update state to hide the modal
  };
  // Function to handle modal show action
  const handleShow = () => {
    setShow(true); // Update state to show the modal
    console.log(destinations);
  };
  return (
    <>
      <MuiButton
        // disabled={row.status === "Assigned" ? true : false}
        variant="contained"
        sx={{
          width: "40px",
          my: "0px", // Margin y-axis
          mb: "0px",
          mr: "10px",
          ml: "13px",
          backgroundColor: "#155e75",
          color: "white",
          px: 3,
          fontSize: "10px",
          borderRadius: "8px",
        }}
        onClick={handleShow} // Set click handler to show modal
      >
        View
      </MuiButton>
      {/* Modal component to display destinations */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static" // Prevent closing when clicking outside
        keyboard={false} // Prevent closing with the escape key
        dialogClassName="modal-90w"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "blue" }}>
            Deliver Destinations . . .
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {/* Component to display route map with destinations */}
            <div>
              <ViewRouteMap destinations={destinations} />
            </div>
          </div>
        </Modal.Body>
        {/* Modal footer with destination count and close button */}
        <Modal.Footer
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div style={{ textAlign: "left", fontWeight: "bold" }}>
            Destination Count: {destinations.length - 1}{" "}
            {/* Display count of destinations */}
          </div>
          <Button variant="primary" onClick={handleClose}>
            Close {/* Button to close the modal */}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewRouteModal;
