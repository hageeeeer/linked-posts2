import { createContext, useState } from "react";

export const counterContext = createContext();

export default function CounterContextProvider({ children }) {
  const [counter, setCounter] = useState(0);

  function increase() {
    setCounter(counter + 1);
  }

  return (
    <counterContext.Provider
      value={{
        counter,
        increase,
      }}
    >
      {children}
    </counterContext.Provider>
  );
}
