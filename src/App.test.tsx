import { fireEvent, render, screen } from "@testing-library/react";
import Calculator from "./App";

test('renders Calculator with initial display "0"', () => {
  render(<Calculator />);
  const displayElement = screen.getByTestId("calculator-display");
  expect(displayElement).toBeInTheDocument();
});

test("updates display when number buttons are clicked", () => {
  render(<Calculator />);

  const button = screen.getByText("1");

  fireEvent.click(button);
  const display = screen.getByTestId("calculator-display");
  expect(display).toHaveTextContent("1");
});
