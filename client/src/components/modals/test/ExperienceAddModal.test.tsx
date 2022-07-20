import React from "react";
import { render, screen } from "@testing-library/react";
import ExperienceAddModal from "../ExperienceAddModal";
import userEvent from "@testing-library/user-event";

const props = {
  addRecord: jest.fn(),
  handleClose: jest.fn(),
};

test("render component with base structure", () => {
  render(<ExperienceAddModal {...props} />);
  const linkElement = screen.getByText(/Add Record/i);
  expect(linkElement).toBeInTheDocument();
});

test("should add record", () => {
  render(<ExperienceAddModal {...props} />);

  const textBox = screen.getByTestId("add-modal-description");
  userEvent.type(textBox, "helllo world");

  const button = screen.getByRole("button", {
    name: /Add/i,
  });

  userEvent.click(button);

  expect(props.addRecord).toBeCalledTimes(1);
});

test("should close modal", () => {
  render(<ExperienceAddModal {...props} />);

  const button = screen.getByRole("button", { name: "Close" });

  userEvent.click(button);

  expect(props.handleClose).toBeCalledTimes(1);
});
