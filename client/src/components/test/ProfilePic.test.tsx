import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProfilePic from "../ProfilePic";

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
  handleShow: jest.fn(),
};

test("render component with base structure", () => {
  render(<ProfilePic {...props} />);
  const text = screen.getByText(/Age\s-/i);
  expect(text).toBeInTheDocument();
});

test("should click handleClick", async () => {
  const { container } = render(<ProfilePic {...props} />);
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const button = container.querySelector("div[role=info] > svg");

  expect(button).toBeInTheDocument();
  if (button) {
    userEvent.click(button);
    // eslint-disable-next-line jest/no-conditional-expect
    expect(props.handleShow).toBeCalledTimes(1);
  }
});
