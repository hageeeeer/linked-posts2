import React, { useMemo, useState } from "react";

function calc(num) {
  console.log("calc fun");

  for (let i = 0; i < 10000000; i++) {
    num += i;
  }
  return num;
}

export default function Test() {
  // lazy initalization
  
  const [list, setList] = useState(["a", "b", "c"]);
  
  const cashedvalue = useMemo(() => calc(counter), [counter]);
  
  const [counter, setCounter] = useState(0);
  function increase() {
    setCounter(counter + 1);
  }

  function addItem() {
    setList([...list, "new Item"]);
  }

  return (
    <div className="container">
      <h1>calc:{cashedvalue}</h1>
      <h1 onClick={increase}>counter:{counter}</h1>
      <button onClick={addItem}>add item</button>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// memoization

// useMemo,useCallback,memo()
