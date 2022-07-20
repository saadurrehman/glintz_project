import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Formik } from "formik";
import DatePicker from "react-datepicker";
import { Values } from "../../types";
import { noop, onSubmit, setImageValue } from "../../utils";
import { validateSchema } from "../../validationSchema";

type Props = {
  handleClose: () => void;
  addRecord: (values: Values) => Promise<void>;
};

const initialValues = {
  file: null,
  description: "",
  companyName: "",
  companyLogo: "",
  jobTitle: "",
  isCurrentlyWorkingHere: false,
  startDate: new Date(),
  endDate: new Date(),
};

const ExperienceAddModal = ({ handleClose, addRecord }: Props) => {
  const handleModalClose = (resetForm: () => void) => {
    resetForm();
    handleClose();
  };

  return (
    <Modal show={true} centered>
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        enableReinitialize
        onSubmit={noop}
      >
        {({ setFieldValue, dirty, values, resetForm, errors }) => {
          console.log(errors);
          return (
            <>
              <Modal.Header>
                <Modal.Title>Add Record</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <Form.Label htmlFor="inputPassword5">Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="companyName"
                    value={values.companyName}
                    onChange={(e) =>
                      setFieldValue("companyName", e.target.value)
                    }
                  />
                  <Form.Label className="mt-3" htmlFor="inputPassword5">
                    Company Logo
                  </Form.Label>
                  <br />
                  {values.companyLogo ? (
                    <div className="mt-3">
                      <img
                        src={values.companyLogo}
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
                            setImageValue(event, setFieldValue, "companyLogo")
                          }
                        />
                        Change
                      </label>
                      <Button
                        variant="danger"
                        className="mx-2"
                        onClick={() => {
                          setFieldValue("companyLogo", null);
                          setFieldValue("file", null);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <Form.Control
                      name="companyLogo"
                      type="file"
                      accept="image/png, image/gif, image/jpeg"
                      className="custom-file-input"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setImageValue(event, setFieldValue, "companyLogo")
                      }
                    />
                  )}
                  <Form.Label className="mt-3" htmlFor="inputPassword5">
                    Description
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    data-testid="add-modal-description"
                    as="textarea"
                    rows={5}
                    value={values.description}
                    onChange={(e) =>
                      setFieldValue("description", e.target.value)
                    }
                  />
                  <Form.Label className="mt-3" htmlFor="inputPassword5">
                    Job Title
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="jobTitle"
                    value={values.jobTitle}
                    onChange={(e) => setFieldValue("jobTitle", e.target.value)}
                  />
                  <Form.Check
                    className="mt-3"
                    type="checkbox"
                    checked={values.isCurrentlyWorkingHere}
                    onChange={(e) =>
                      setFieldValue("isCurrentlyWorkingHere", e.target.checked)
                    }
                    label="currently working"
                  />
                  <Form.Label className="mt-3" htmlFor="inputPassword5">
                    Start Date
                  </Form.Label>
                  <DatePicker
                    selected={values.startDate}
                    onChange={(date: Date) => setFieldValue("startDate", date)}
                  />
                  {errors.startDate && <small>{`${errors.startDate}`}</small>}
                  <br />
                  <Form.Label className="mt-3" htmlFor="inputPassword5">
                    End Date
                  </Form.Label>
                  <DatePicker
                    disabled={values.isCurrentlyWorkingHere}
                    selected={values.endDate}
                    onChange={(date: Date) => setFieldValue("endDate", date)}
                  />
                  {errors.endDate && <small>{`${errors.endDate}`}</small>}
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
                  disabled={!dirty || Object.keys(errors).length > 0}
                  onClick={() => onSubmit(values, addRecord, handleClose)}
                >
                  Add
                </Button>
              </Modal.Footer>
            </>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default ExperienceAddModal;
