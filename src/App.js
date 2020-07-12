import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
  const ops = ["/", "*", "-", "+", "="];

  const [currentnum, setcurrentnum] = useState("0");
  const [operation, setoperation] = useState(undefined);
  const [prevnum, setprevnum] = useState(undefined);
  console.log(prevnum, operation, currentnum);

  const handleclick = (e) => {
    const value = e.target.innerText;
    const num = Number(value);

    if (!isNaN(num)) {
      if (currentnum === "0") {
        setcurrentnum(value);
      } else {
        setcurrentnum(currentnum + value);
      }
      return;
    }

    switch (value) {
      case "AC":
        setcurrentnum("0");
        setprevnum(undefined);
        setoperation(undefined);
        break;

      case ".":
        if (!currentnum.includes(".")) {
          setcurrentnum(currentnum + value);
        }
        break;
      default:
        if (!operation) {
          setoperation(value);
          setprevnum(currentnum);
          setcurrentnum("");
        } else if (operation === "=") {
          setoperation(undefined);
          setcurrentnum(prevnum);
        } else if (value === "=") {
          const evaluated = eval(`${prevnum} ${operation} ${currentnum}`);
          setprevnum(evaluated);
          setcurrentnum(value === "=" ? evaluated : "0");
          setoperation(undefined);
        } else {
          setoperation(value);
          setprevnum(eval(`${currentnum} ${operation} ${prevnum}`));
          setcurrentnum("0");
        }
    }
  };

  return (
    <div className="calculator">
      <div id="display" className="display">
        <small>{prevnum}</small>
        {currentnum}
      </div>
      <div className="btn-container">
        <button onClick={handleclick} className="light-grey big-h ac">
          AC
        </button>
        {nums.map((num, index) => (
          <button
            key={index}
            onClick={handleclick}
            className={`dark-grey ${num === 0 && "big-h"} `}
          >
            {num}
          </button>
        ))}
        <button onClick={handleclick} className="dark-grey  ">
          .
        </button>
      </div>
      <div className="ops-container">
        {ops.map((op, index) => (
          <button key={index} onClick={handleclick} className="orange">
            {op}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
