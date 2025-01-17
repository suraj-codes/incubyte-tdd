import React, { useState } from "react";
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
      const result =
        operation === "+" ? memory + parseFloat(display) : parseFloat(display);
      setDisplay(result.toString());
      setMemory(null);
      setOperation(null);
    }
  };

  return (
    <div className="calculator">
      <div className="display" data-testid="calculator-display">
        {display}
      </div>
      <div className="button-grid">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button
            key={num}
            onClick={() => setDisplay(display + num.toString())}
          >
            {num}
          </button>
        ))}
        <button onClick={() => handleOperator("+")}>+</button>
        <button onClick={handleEquals}>=</button>
      </div>
    </div>
  );
}

export default App;
