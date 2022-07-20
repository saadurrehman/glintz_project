import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Formik } from "formik";
import { User, Values } from "../../types";
import { onSubmit, setImageValue } from "../../utils";
import "./css/Profile.css";

type Props = {
  handleClose: () => void;
  updateRecord: (values: Values) => Promise<void>;
  user: User;
};

const ProfileModal = ({ user, handleClose, updateRecord }: Props) => {
  const handleModalClose = (resetForm: () => void) => {
    resetForm();
    handleClose();
  };

  return (
    <Modal show={true} centered>
      <Formik
        initialValues={{
          file: null,
          age: user.age,
          name: user.name,
          profilePicture: user.profilePicture || null,
        }}
        enableReinitialize
        onSubmit={() => {}}
      >
        {({ setFieldValue, dirty, values, resetForm }) => {
          console.log(values);
          return (
            <>
              <Modal.Header>
                <Modal.Title>Update Record</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <Form.Label htmlFor="inputPassword5">Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    data-testid="profile-name"
                    value={values.name}
                    onChange={(e) => setFieldValue("name", e.target.value)}
                  />
                  <Form.Label htmlFor="inputPassword5">Age</Form.Label>
                  <Form.Control
                    type="number"
                    name="age"
                    value={values.age}
                    onChange={(e) => setFieldValue("age", e.target.value)}
                  />
                  {values.profilePicture ? (
                    <div className="mt-3">
                      <img
                        src={values.profilePicture}
                        className="mx-3"
                        alt=""
                        width={70}
                        height={70}
                      />
                      <label className="custom-file-upload btn btn-secondary">
                        <input
                          type="file"
                          accept="image/png, image/gif, image/jpeg"
                          onChange={(event) =>
                            setImageValue(
                              event,
                              setFieldValue,
                              "profilePicture"
                            )
                          }
                        />
                        Change
                      </label>

                      <Button
                        variant="danger"
                        className="mx-2"
                        onClick={() => {
                          setFieldValue("profilePicture", null);
                          setFieldValue("file", null);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Form.Label className="mt-3" htmlFor="inputPassword5">
                        Profile Pic
                      </Form.Label>
                      <Form.Control
                        name="companyLogo"
                        type="file"
                        accept="image/png, image/gif, image/jpeg"
                        className="custom-file-input"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) =>
                          setImageValue(event, setFieldValue, "profilePicture")
                        }
                      />
                    </>
                  )}
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => handleModalClose(resetForm)}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  disabled={!dirty}
                  onClick={() => onSubmit(values, updateRecord, handleClose)}
                >
                  Update
                </Button>
              </Modal.Footer>
            </>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default ProfileModal;
