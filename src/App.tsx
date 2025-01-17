import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [memory, setMemory] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);

  const handleOperator = (op: string) => {
    setMemory(parseFloat(display));
    setOperation(op);
    setDisplay("0");
  };

  const handleEquals = () => {
    if (operation && memory !== null) {
      let result;
      switch (operation) {
        case "+":
          result = memory + parseFloat(display);
          break;
        case "-":
          result = memory - parseFloat(display);
          break;
        case "*":
          result = memory * parseFloat(display);
          break;
        case "/":
          if (parseFloat(display) !== 0) {
            result = memory / parseFloat(display);
          } else {
            result = "Error";
          }
          break;
        default:
          return;
      }
      setDisplay(result.toString());
      setMemory(null);
      setOperation(null);
    }
  };

  const handleDecimal = () => {
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setMemory(null);
    setOperation(null);
  };

  const handleBackspace = () => {
    setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
  };

  useEffect(() => {
    const handleKeyPress = (e: { key: string }) => {
      if (/^[0-9]$/.test(e.key))
        setDisplay(display === "0" ? e.key : display + e.key);
      if (e.key === "+") handleOperator("+");
      if (e.key === "=") handleEquals();
      if (e.key === ".") handleDecimal();
      if (e.key === "Escape") handleClear();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [display]);

  return (
    <div className="calculator">
      <div className="display" data-testid="calculator-display">
        {display}
      </div>
      <div className="button-grid">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button
            key={num}
            onClick={() =>
              setDisplay(
                display === "0" ? num.toString() : display + num.toString()
              )
            }
          >
            {num}
          </button>
        ))}
        <button onClick={() => handleOperator("+")}>+</button>
        <button onClick={() => handleOperator("-")}>-</button>
        <button onClick={() => handleOperator("*")}>*</button>
        <button onClick={() => handleOperator("/")}>/</button>
        <button onClick={handleEquals}>=</button>
        <button onClick={handleDecimal}>.</button>
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleBackspace}>←</button>
      </div>
    </div>
  );
}

export default App;
