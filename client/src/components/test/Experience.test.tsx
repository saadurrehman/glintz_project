import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Experience from "../Experience";

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
  handleShowDeleteModal: jest.fn(),
  handleCloseDeleteModal: () => {},
  showDeleteModal: false,
  handleShowAddModal: jest.fn(),
  handleShowEditModal: jest.fn(),
  removeExperienceRecord: jest.fn().mockImplementation(() => Promise.resolve()),
};

test("render component with base structure", () => {
  render(<Experience {...props} />);
  const text = screen.getByText(/Please add experience/i);
  expect(text).toBeInTheDocument();
});

test("should not render please add experience text when we have experience data", async () => {
  const diffProp = {
    ...props,
    user: {
      ...props.user,
      experiences: [
        {
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
      ],
    },
  };

  render(<Experience {...diffProp} />);
  const text = await screen.findByText(/Experiences/i);
  expect(text).toBeInTheDocument();
});

test("should click handleShowAddModal", () => {
  const { container } = render(<Experience {...props} />);

  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const button = container.querySelector("div[role=experience] > svg");

  expect(button).toBeInTheDocument();
  if (button) {
    userEvent.click(button);
    // eslint-disable-next-line jest/no-conditional-expect
    expect(props.handleShowAddModal).toBeCalledTimes(1);
  }
});

test("should click handleShowEditModal", () => {
  const diffProp = {
    ...props,
    user: {
      ...props.user,
      experiences: [
        {
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
      ],
    },
  };

  render(<Experience {...diffProp} />);
  const button = screen.getByTestId("show-edit-modal");

  expect(button).toBeInTheDocument();
  if (button) {
    userEvent.click(button);
    // eslint-disable-next-line jest/no-conditional-expect
    expect(props.handleShowEditModal).toBeCalledTimes(1);
  }
});

test("should click handleShowDeleteModal", () => {
  const diffProp = {
    ...props,
    user: {
      ...props.user,
      experiences: [
        {
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
      ],
    },
  };

  render(<Experience {...diffProp} />);
  const button = screen.getByTestId("show-delete-modal");

  expect(button).toBeInTheDocument();
  if (button) {
    userEvent.click(button);
    // eslint-disable-next-line jest/no-conditional-expect
    expect(props.handleShowDeleteModal).toBeCalledTimes(1);
  }
});
