import React from "react";
import { render, screen } from "@testing-library/react";
import ExperienceEditModal from "../ExperienceEditModal";
import userEvent from "@testing-library/user-event";

const props = {
  experience: {
    jobTitle: "test",
    description: "test",
    startDate: new Date(),
    endDate: new Date(),
    companyName: "test",
    companyLogo: null,
    id: 1,
    createdAt: "date",
    updatedAt: "date",
    isCurrentlyWorkingHere: false,
    user_id: 1,
  },
  updateRecord: jest.fn(),
  handleClose: jest.fn(),
};

test("render component with base structure", () => {
  render(<ExperienceEditModal {...props} />);
  const linkElement = screen.getByText(/Update Record/i);
  expect(linkElement).toBeInTheDocument();
});

test("should update record", () => {
  render(<ExperienceEditModal {...props} />);

  const textBox = screen.getByTestId("add-modal-description");
  userEvent.type(textBox, "helllo world");

  const button = screen.getByRole("button", {
    name: /Update/i,
  });

  userEvent.click(button);

  expect(props.updateRecord).toBeCalledTimes(1);
});

test("should close modal", () => {
  render(<ExperienceEditModal {...props} />);

  const button = screen.getByRole("button", { name: "Close" });

  userEvent.click(button);

  expect(props.handleClose).toBeCalledTimes(1);
});
