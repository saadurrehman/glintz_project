"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const LoadingSpinner = () => {
    return (<react_bootstrap_1.Modal show={true} centered>
      <react_bootstrap_1.Modal.Body>
        <div style={{ width: "100%", textAlign: "center" }}>
          <react_bootstrap_1.Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </react_bootstrap_1.Spinner>
          <h5>Processing.....</h5>
        </div>
      </react_bootstrap_1.Modal.Body>
    </react_bootstrap_1.Modal>);
};
exports.default = LoadingSpinner;
