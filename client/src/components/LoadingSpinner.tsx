import React from "react";
import { Spinner, Modal } from "react-bootstrap";

const LoadingSpinner = () => {
  return (
    <Modal show={true} centered>
      <Modal.Body>
        <div style={{ width: "100%", textAlign: "center" }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <h5>Processing.....</h5>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoadingSpinner;
