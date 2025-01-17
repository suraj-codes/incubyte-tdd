import React, { useEffect, useState } from "react";

const App = () => {
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="calculator bg-white rounded-2xl shadow-2xl p-6 w-80">
        <div
          className="display bg-gray-100 rounded-xl p-4 mb-4 text-right text-3xl font-mono h-16 flex items-center justify-end overflow-hidden"
          data-testid="calculator-display"
        >
          {display}
        </div>
        <div className="button-grid grid grid-cols-4 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
            <button
              key={num}
              onClick={() =>
                setDisplay(
                  display === "0" ? num.toString() : display + num.toString()
                )
              }
              className="bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold py-3 rounded-lg transition-colors duration-200 active:scale-95 transform"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleOperator("+")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors duration-200 active:scale-95 transform"
          >
            +
          </button>
          <button
            onClick={() => handleOperator("-")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors duration-200 active:scale-95 transform"
          >
            -
          </button>
          <button
            onClick={() => handleOperator("*")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors duration-200 active:scale-95 transform"
          >
            *
          </button>
          <button
            onClick={() => handleOperator("/")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors duration-200 active:scale-95 transform"
          >
            /
          </button>
          <button
            onClick={handleEquals}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors duration-200 active:scale-95 transform"
          >
            =
          </button>
          <button
            onClick={handleDecimal}
            className="bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold py-3 rounded-lg transition-colors duration-200 active:scale-95 transform"
          >
            .
          </button>
          <button
            onClick={handleClear}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition-colors duration-200 active:scale-95 transform"
          >
            Clear
          </button>
          <button
            onClick={handleBackspace}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-lg transition-colors duration-200 active:scale-95 transform"
          >
            ←
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
