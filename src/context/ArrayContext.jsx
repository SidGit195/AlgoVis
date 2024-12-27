import { createContext, useState, useContext } from 'react';

const ArrayContext = createContext();

export function ArrayProvider({ children }) {
  const [array, setArray] = useState([]);
  const [comparing, setComparing] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

  const generateArray = (size = 50) => {
    const newArray = Array.from({ length: size }, () => 
      Math.floor(Math.random() * 500) + 10
    );
    setArray(newArray);
    setComparing([]);
    setSorted([]);
  };

  return (
    <ArrayContext.Provider value={{
      array,
      setArray,
      comparing,
      setComparing,
      sorted,
      setSorted,
      isSorting,
      setIsSorting,
      generateArray
    }}>
      {children}
    </ArrayContext.Provider>
  );
}

export const useArray = () => useContext(ArrayContext);