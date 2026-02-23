import React, { useCallback, useMemo, useState } from "react";
import Child from "./Child";

export default function Parent() {
  const [counter, setCounter] = useState(0);
  function increase() {
    setCounter(counter + 1);
  }

  const cashedvalue = useMemo(() => {
    return {
      data: "data from parent",
    };
  }, []);

  const cachFn = useCallback(() => {
    console.log("hi");
  }, []);

  //   refernce array object fn==> return value

  return (
    <div>
      Parent
      <h1 onClick={increase}>counter:{counter}</h1>
      <Child data={cashedvalue} hi={cachFn} />
    </div>
  );
}

// higer older fun ==> fun take arg fun or retrun fn
// higher older com ==>
