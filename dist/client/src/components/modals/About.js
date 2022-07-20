"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const formik_1 = require("formik");
const AboutModal = ({ user, updateRecord, handleClose }) => {
    const onSubmit = (values) => __awaiter(void 0, void 0, void 0, function* () {
        yield updateRecord(values);
        handleClose();
    });
    return (<react_bootstrap_1.Modal show={true} centered>
      <formik_1.Formik initialValues={{ description: user.description }} enableReinitialize onSubmit={() => { }}>
        {({ setFieldValue, dirty, values }) => (<>
            <react_bootstrap_1.Modal.Header>
              <react_bootstrap_1.Modal.Title>Update Record</react_bootstrap_1.Modal.Title>
            </react_bootstrap_1.Modal.Header>

            <react_bootstrap_1.Modal.Body>
              <form>
                <react_bootstrap_1.Form.Label htmlFor="inputPassword5">Description</react_bootstrap_1.Form.Label>
                <react_bootstrap_1.Form.Control type="text" as="textarea" rows={6} name="description" value={values.description} onChange={(e) => setFieldValue("description", e.target.value)}/>
              </form>
            </react_bootstrap_1.Modal.Body>
            <react_bootstrap_1.Modal.Footer>
              <react_bootstrap_1.Button variant="secondary" onClick={handleClose}>
                Close
              </react_bootstrap_1.Button>
              <react_bootstrap_1.Button variant="primary" disabled={!dirty} onClick={() => onSubmit(values)}>
                Update
              </react_bootstrap_1.Button>
            </react_bootstrap_1.Modal.Footer>
          </>)}
      </formik_1.Formik>
    </react_bootstrap_1.Modal>);
};
exports.default = AboutModal;
