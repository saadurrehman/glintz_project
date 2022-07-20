import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Formik } from "formik";
import { User, Values } from "../../types";

type Props = {
  handleClose: () => void;
  updateRecord: (values: Values) => Promise<void>;
  user: User;
};

const AboutModal = ({ user, updateRecord, handleClose }: Props) => {
  const onSubmit = async (values: Values) => {
    await updateRecord(values);
    handleClose();
  };

  return (
    <Modal show={true} centered>
      <Formik
        initialValues={{ description: user.description }}
        enableReinitialize
        onSubmit={() => {}}
      >
        {({ setFieldValue, dirty, values }) => (
          <>
            <Modal.Header>
              <Modal.Title>Update Record</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <form>
                <Form.Label htmlFor="inputPassword5">Description</Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  rows={6}
                  name="description"
                  value={values.description}
                  onChange={(e) => setFieldValue("description", e.target.value)}
                />
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="primary"
                disabled={!dirty}
                onClick={() => onSubmit(values)}
              >
                Update
              </Button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </Modal>
  );
};

export default AboutModal;
