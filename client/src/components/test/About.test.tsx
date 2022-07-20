import React from "react";
import { render, screen } from "@testing-library/react";
import About from "../About";

const props = {
  user: {
    description: "Testing description",
    age: 2,
    createdAt: "01/01/2021",
    experience: 3,
    experiences: [],
    id: 5,
    name: "name",
    profilePicture: null,
    updatedAt: "01/01/2021",
  },
  handleShow: () => {},
};

test("render component with base structure", () => {
  render(<About {...props} />);
  const linkElement = screen.getByText(/Testing description/i);
  expect(linkElement).toBeInTheDocument();
});
