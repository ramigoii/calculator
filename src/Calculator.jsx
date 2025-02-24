import React, { useState, useEffect } from "react";
import "./App.css";

const Calculator = () => {
  const [input, setInput] = useState("");

  // Function to safely evaluate expressions
  const calculateResult = () => {
    try {
      setInput(Function(`"use strict"; return (${input})`)().toString());
    } catch {
      setInput("Error");
    }
  };

  // Function for handling button clicks
  const handleClick = (value) => {
    if (value === "+/-") {
      setInput((prev) => (prev ? (parseFloat(prev) * -1).toString() : prev));
    } else if (value === "%") {
      setInput((prev) => (prev ? (parseFloat(prev) / 100).toString() : prev));
    } else {
      setInput((prev) => prev + value);
    }
  };

  // Clear function
  const handleClear = () => {
    setInput("");
  };

  // ✅ FIX: Keyboard input now works 100%
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (/[\d+\-*/.%]/.test(event.key)) {
        setInput((prev) => prev + event.key);
      } else if (event.key === "Enter") {
        event.preventDefault();
        calculateResult(); // ✅ Now "Enter" works!
      } else if (event.key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
      } else if (event.key === "Escape") {
        handleClear();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }); // ❌ Removed dependency array to fix "Enter"

  return (
    <div className="calculator">
      <input type="text" value={input} readOnly />
      <div className="buttons">
        <button className="clear" onClick={handleClear}>AC</button>
        <button className="clear" onClick={() => handleClick("+/-")}>+/-</button>
        <button className="clear" onClick={() => handleClick("%")}>%</button>
        <button className="operator" onClick={() => handleClick("/")}>÷</button>

        <button className="digit" onClick={() => handleClick("7")}>7</button>
        <button className="digit" onClick={() => handleClick("8")}>8</button>
        <button className="digit" onClick={() => handleClick("9")}>9</button>
        <button className="operator" onClick={() => handleClick("*")}>×</button>

        <button className="digit" onClick={() => handleClick("4")}>4</button>
        <button className="digit" onClick={() => handleClick("5")}>5</button>
        <button className="digit" onClick={() => handleClick("6")}>6</button>
        <button className="operator" onClick={() => handleClick("-")}>-</button>

        <button className="digit" onClick={() => handleClick("1")}>1</button>
        <button className="digit" onClick={() => handleClick("2")}>2</button>
        <button className="digit" onClick={() => handleClick("3")}>3</button>
        <button className="operator" onClick={() => handleClick("+")}>+</button>

        <button className="digit zero" onClick={() => handleClick("0")}>0</button>
        <button className="digit" onClick={() => handleClick(".")}>.</button>
        <button className="equal" onClick={calculateResult}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
