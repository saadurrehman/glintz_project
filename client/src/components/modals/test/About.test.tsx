import React from "react";
import { render, screen } from "@testing-library/react";
import About from "../About";
import userEvent from "@testing-library/user-event";

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
  updateRecord: jest.fn(),
  handleClose: () => {},
};

test("render component with base structure", () => {
  render(<About {...props} />);
  const linkElement = screen.getByText(/Update Record/i);
  expect(linkElement).toBeInTheDocument();
});

test("should update record", () => {
  render(<About {...props} />);

  const textBox = screen.getByRole("textbox");
  userEvent.type(textBox, "helllo world");

  const button = screen.getByRole("button", {
    name: /update/i,
  });

  userEvent.click(button);

  expect(props.updateRecord).toBeCalledTimes(1);
});
