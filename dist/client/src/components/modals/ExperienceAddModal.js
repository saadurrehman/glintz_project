"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const formik_1 = require("formik");
const react_datepicker_1 = __importDefault(require("react-datepicker"));
const utils_1 = require("../../utils");
const validationSchema_1 = require("../../validationSchema");
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
const ExperienceAddModal = ({ handleClose, addRecord }) => {
    const handleModalClose = (resetForm) => {
        resetForm();
        handleClose();
    };
    return (<react_bootstrap_1.Modal show={true} centered>
      <formik_1.Formik initialValues={initialValues} validationSchema={validationSchema_1.validateSchema} enableReinitialize onSubmit={utils_1.noop}>
        {({ setFieldValue, dirty, values, resetForm, errors }) => {
            console.log(errors);
            return (<>
              <react_bootstrap_1.Modal.Header>
                <react_bootstrap_1.Modal.Title>Add Record</react_bootstrap_1.Modal.Title>
              </react_bootstrap_1.Modal.Header>
              <react_bootstrap_1.Modal.Body>
                <form>
                  <react_bootstrap_1.Form.Label htmlFor="inputPassword5">Company Name</react_bootstrap_1.Form.Label>
                  <react_bootstrap_1.Form.Control type="text" name="companyName" value={values.companyName} onChange={(e) => setFieldValue("companyName", e.target.value)}/>
                  <react_bootstrap_1.Form.Label className="mt-3" htmlFor="inputPassword5">
                    Company Logo
                  </react_bootstrap_1.Form.Label>
                  <br />
                  {values.companyLogo ? (<div className="mt-3">
                      <img src={values.companyLogo} className="mx-3" alt="" width={70} height={70}/>
                      <label className="custom-file-upload btn btn-secondary">
                        <input type="file" accept="image/png, image/gif, image/jpeg" onChange={(event) => (0, utils_1.setImageValue)(event, setFieldValue, "companyLogo")}/>
                        Change
                      </label>
                      <react_bootstrap_1.Button variant="danger" className="mx-2" onClick={() => {
                        setFieldValue("companyLogo", null);
                        setFieldValue("file", null);
                    }}>
                        Remove
                      </react_bootstrap_1.Button>
                    </div>) : (<react_bootstrap_1.Form.Control name="companyLogo" type="file" accept="image/png, image/gif, image/jpeg" className="custom-file-input" onChange={(event) => (0, utils_1.setImageValue)(event, setFieldValue, "companyLogo")}/>)}
                  <react_bootstrap_1.Form.Label className="mt-3" htmlFor="inputPassword5">
                    Description
                  </react_bootstrap_1.Form.Label>
                  <react_bootstrap_1.Form.Control type="text" name="description" data-testid="add-modal-description" as="textarea" rows={5} value={values.description} onChange={(e) => setFieldValue("description", e.target.value)}/>
                  <react_bootstrap_1.Form.Label className="mt-3" htmlFor="inputPassword5">
                    Job Title
                  </react_bootstrap_1.Form.Label>
                  <react_bootstrap_1.Form.Control type="text" name="jobTitle" value={values.jobTitle} onChange={(e) => setFieldValue("jobTitle", e.target.value)}/>
                  <react_bootstrap_1.Form.Check className="mt-3" type="checkbox" checked={values.isCurrentlyWorkingHere} onChange={(e) => setFieldValue("isCurrentlyWorkingHere", e.target.checked)} label="currently working"/>
                  <react_bootstrap_1.Form.Label className="mt-3" htmlFor="inputPassword5">
                    Start Date
                  </react_bootstrap_1.Form.Label>
                  <react_datepicker_1.default selected={values.startDate} onChange={(date) => setFieldValue("startDate", date)}/>
                  {errors.startDate && <small>{`${errors.startDate}`}</small>}
                  <br />
                  <react_bootstrap_1.Form.Label className="mt-3" htmlFor="inputPassword5">
                    End Date
                  </react_bootstrap_1.Form.Label>
                  <react_datepicker_1.default disabled={values.isCurrentlyWorkingHere} selected={values.endDate} onChange={(date) => setFieldValue("endDate", date)}/>
                  {errors.endDate && <small>{`${errors.endDate}`}</small>}
                </form>
              </react_bootstrap_1.Modal.Body>
              <react_bootstrap_1.Modal.Footer>
                <react_bootstrap_1.Button variant="secondary" onClick={() => handleModalClose(resetForm)}>
                  Close
                </react_bootstrap_1.Button>
                <react_bootstrap_1.Button variant="primary" disabled={!dirty || Object.keys(errors).length > 0} onClick={() => (0, utils_1.onSubmit)(values, addRecord, handleClose)}>
                  Add
                </react_bootstrap_1.Button>
              </react_bootstrap_1.Modal.Footer>
            </>);
        }}
      </formik_1.Formik>
    </react_bootstrap_1.Modal>);
};
exports.default = ExperienceAddModal;
