import { render, screen } from "@testing-library/react";
import Calculator from "./App";

test('renders Calculator with initial display "0"', () => {
  render(<Calculator />);
  const displayElement = screen.getByText("0");
  expect(displayElement).toBeInTheDocument();
});
