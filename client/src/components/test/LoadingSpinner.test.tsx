import { render, screen } from "@testing-library/react";
import LoadingSpinner from "../LoadingSpinner";

test("render component with base structure", () => {
  render(<LoadingSpinner />);
  const text = screen.getByText(/Processing/i);
  expect(text).toBeInTheDocument();
});
