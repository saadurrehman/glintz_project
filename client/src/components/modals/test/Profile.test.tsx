import React from "react";
import { render, screen } from "@testing-library/react";
import Profile from "../Profile";
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
  handleClose: jest.fn(),
};

test("render component with base structure", () => {
  render(<Profile {...props} />);
  const linkElement = screen.getByText(/Update Record/i);
  expect(linkElement).toBeInTheDocument();
});

test("should update record", () => {
  render(<Profile {...props} />);

  const textBox = screen.getByTestId("profile-name");
  userEvent.type(textBox, "helllo world");

  const button = screen.getByRole("button", {
    name: /Update/i,
  });

  userEvent.click(button);

  expect(props.updateRecord).toBeCalledTimes(1);
});

test("should close modal", () => {
  render(<Profile {...props} />);

  const button = screen.getByRole("button", { name: "Close" });

  userEvent.click(button);

  expect(props.handleClose).toBeCalledTimes(1);
});
