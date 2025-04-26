import { createContext, useContext, useState } from 'react';

const RowContext = createContext();

export const RowProvider = ({ children }) => {
  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <RowContext.Provider value={{ selectedRow, setSelectedRow }}>
      {children}
    </RowContext.Provider>
  );
};

export const useRow = () => useContext(RowContext);