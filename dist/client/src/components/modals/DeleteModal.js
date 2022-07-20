"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_bootstrap_1 = require("react-bootstrap");
const DeleteModal = ({ deleteRecord, recordId, handleModalClose }) => {
    return (<react_bootstrap_1.Modal show={true} centered>
      <react_bootstrap_1.Modal.Header>
        <react_bootstrap_1.Modal.Title>Delete Record</react_bootstrap_1.Modal.Title>
      </react_bootstrap_1.Modal.Header>
      <react_bootstrap_1.Modal.Body>Are you sure you want to delete the record?</react_bootstrap_1.Modal.Body>
      <react_bootstrap_1.Modal.Footer>
        <react_bootstrap_1.Button variant="secondary" onClick={() => handleModalClose()}>
          Close
        </react_bootstrap_1.Button>
        <react_bootstrap_1.Button variant="danger" onClick={() => deleteRecord(recordId)}>
          Delete
        </react_bootstrap_1.Button>
      </react_bootstrap_1.Modal.Footer>
    </react_bootstrap_1.Modal>);
};
exports.default = DeleteModal;
