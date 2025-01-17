import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");

  const handleNumber = (num: React.SetStateAction<string>) => {
    setDisplay(display === "0" ? num : display + num);
  };
  return (
    <div className="calculator">
      <div className="display" data-testid="calculator-display">
        {display}
      </div>
      <div className="button-grid">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button key={num} onClick={() => handleNumber(num.toString())}>
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
