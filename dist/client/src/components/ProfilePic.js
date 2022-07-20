"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nopic_jpg_1 = __importDefault(require("../img/nopic.jpg"));
const md_1 = require("react-icons/md");
const ProfilePic = ({ user, handleShow }) => {
    return (<div className="text-center pb-4 border-bottom">
      <img src={user.profilePicture || nopic_jpg_1.default} alt="" width={70} height={70} className="avatar-lg img-thumbnail rounded-circle mb-4"/>
      <h5 className="mb-0">{user.name}</h5>
      <p className="text-muted mb-3">Age - {user.age}</p>
      <div style={{ position: "absolute", top: "5px", right: "6px" }} role="info">
        <md_1.MdEdit size="1.5em" onClick={() => handleShow()}/>
      </div>
    </div>);
};
exports.default = ProfilePic;
