"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const formik_1 = require("formik");
const utils_1 = require("../../utils");
require("./css/Profile.css");
const ProfileModal = ({ user, handleClose, updateRecord }) => {
    const handleModalClose = (resetForm) => {
        resetForm();
        handleClose();
    };
    return (<react_bootstrap_1.Modal show={true} centered>
      <formik_1.Formik initialValues={{
            file: null,
            age: user.age,
            name: user.name,
            profilePicture: user.profilePicture || null,
        }} enableReinitialize onSubmit={() => { }}>
        {({ setFieldValue, dirty, values, resetForm }) => {
            return (<>
              <react_bootstrap_1.Modal.Header>
                <react_bootstrap_1.Modal.Title>Update Record</react_bootstrap_1.Modal.Title>
              </react_bootstrap_1.Modal.Header>
              <react_bootstrap_1.Modal.Body>
                <form>
                  <react_bootstrap_1.Form.Label htmlFor="inputPassword5">Name</react_bootstrap_1.Form.Label>
                  <react_bootstrap_1.Form.Control type="text" name="name" data-testid="profile-name" value={values.name} onChange={(e) => setFieldValue("name", e.target.value)}/>
                  <react_bootstrap_1.Form.Label htmlFor="inputPassword5">Age</react_bootstrap_1.Form.Label>
                  <react_bootstrap_1.Form.Control type="number" name="age" value={values.age} onChange={(e) => setFieldValue("age", e.target.value)}/>
                  {values.profilePicture ? (<div className="mt-3">
                      <img src={values.profilePicture} className="mx-3" alt="" width={70} height={70}/>
                      <label className="custom-file-upload btn btn-secondary">
                        <input type="file" accept="image/png, image/gif, image/jpeg" onChange={(event) => (0, utils_1.setImageValue)(event, setFieldValue, "profilePicture")}/>
                        Change
                      </label>

                      <react_bootstrap_1.Button variant="danger" className="mx-2" onClick={() => {
                        setFieldValue("profilePicture", null);
                        setFieldValue("file", null);
                    }}>
                        Remove
                      </react_bootstrap_1.Button>
                    </div>) : (<>
                      <react_bootstrap_1.Form.Label className="mt-3" htmlFor="inputPassword5">
                        Profile Pic
                      </react_bootstrap_1.Form.Label>
                      <react_bootstrap_1.Form.Control name="companyLogo" type="file" accept="image/png, image/gif, image/jpeg" className="custom-file-input" onChange={(event) => (0, utils_1.setImageValue)(event, setFieldValue, "profilePicture")}/>
                    </>)}
                </form>
              </react_bootstrap_1.Modal.Body>
              <react_bootstrap_1.Modal.Footer>
                <react_bootstrap_1.Button variant="secondary" onClick={() => handleModalClose(resetForm)}>
                  Close
                </react_bootstrap_1.Button>
                <react_bootstrap_1.Button variant="primary" disabled={!dirty} onClick={() => (0, utils_1.onSubmit)(values, updateRecord, handleClose)}>
                  Update
                </react_bootstrap_1.Button>
              </react_bootstrap_1.Modal.Footer>
            </>);
        }}
      </formik_1.Formik>
    </react_bootstrap_1.Modal>);
};
exports.default = ProfileModal;
