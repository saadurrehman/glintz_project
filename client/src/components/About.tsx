import React from "react";
import { User } from "../types";
import { MdEdit } from "react-icons/md";

type Props = {
  handleShow: () => void;
  user: User;
};

const About = ({ user, handleShow }: Props) => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="fs-18 fw-bold">About</h5>
        <MdEdit size="1.5em" onClick={() => handleShow()} />
      </div>
      <p className="text-muted mt-4">{user.description}</p>
    </div>
  );
};

export default About;
