import { Button, Modal } from "react-bootstrap";

type Props = {
  recordId: string;
  deleteRecord(id: string): void;
  handleModalClose(): void;
};

const DeleteModal = ({ deleteRecord, recordId, handleModalClose }: Props) => {
  return (
    <Modal show={true} centered>
      <Modal.Header>
        <Modal.Title>Delete Record</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete the record?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleModalClose()}>
          Close
        </Button>
        <Button variant="danger" onClick={() => deleteRecord(recordId)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
