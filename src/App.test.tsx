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

test("handles addition correctly", () => {
  render(<Calculator />);
  fireEvent.click(screen.getByText("1"));
  fireEvent.click(screen.getByText("+"));
  fireEvent.click(screen.getByText("2"));
  fireEvent.click(screen.getByText("="));

  const display = screen.getByTestId("calculator-display");
  expect(display).toHaveTextContent("3");
});

test("handles substraction correctly", () => {
  render(<Calculator />);
  fireEvent.click(screen.getByText("4"));
  fireEvent.click(screen.getByText("-"));
  fireEvent.click(screen.getByText("2"));
  fireEvent.click(screen.getByText("="));

  const display = screen.getByTestId("calculator-display");
  expect(display).toHaveTextContent("2");
});

test("handles decimal input correctly", () => {
  render(<Calculator />);
  fireEvent.click(screen.getByText("1"));
  fireEvent.click(screen.getByText("."));
  fireEvent.click(screen.getByText("2"));

  const display = screen.getByTestId("calculator-display");
  expect(display).toHaveTextContent("1.2");
});

test("handles number keys from keyboard correctly", () => {
  render(<Calculator />);
  fireEvent.keyDown(document, { key: "1" });

  const display = screen.getByTestId("calculator-display");
  expect(display).toHaveTextContent("1");

  fireEvent.keyDown(document, { key: "2" });
  expect(display).toHaveTextContent("12");
});

test("Clear key resets the display to 0", () => {
  render(<Calculator />);
  fireEvent.click(screen.getByText("1"));
  fireEvent.click(screen.getByText("Clear"));
  const display = screen.getByTestId("calculator-display");
  expect(display).toHaveTextContent("0");
});

test("Backspace key removes the last digit", () => {
  render(<Calculator />);
  fireEvent.click(screen.getByText("4"));
  fireEvent.click(screen.getByText("2"));
  fireEvent.click(screen.getByText("←"));
  const display = screen.getByTestId("calculator-display");
  expect(display).toHaveTextContent("4");
});
