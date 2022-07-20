"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const md_1 = require("react-icons/md");
const About = ({ user, handleShow }) => {
    return (<div>
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="fs-18 fw-bold">About</h5>
        <md_1.MdEdit size="1.5em" onClick={() => handleShow()}/>
      </div>
      <p className="text-muted mt-4">{user.description}</p>
    </div>);
};
exports.default = About;
