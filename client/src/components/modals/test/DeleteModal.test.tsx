import React from "react";
import { render, screen } from "@testing-library/react";
import DeleteModal from "../DeleteModal";
import userEvent from "@testing-library/user-event";

const props = {
  deleteRecord: jest.fn(),
  recordId: "hello",
  handleModalClose: jest.fn(),
};

test("render component with base structure", () => {
  render(<DeleteModal {...props} />);
  const linkElement = screen.getByText(
    /Are you sure you want to delete the record/i
  );
  expect(linkElement).toBeInTheDocument();
});

test("should delete record", () => {
  render(<DeleteModal {...props} />);

  const button = screen.getByRole("button", { name: "Delete" });

  userEvent.click(button);

  expect(props.deleteRecord).toBeCalledTimes(1);
});
