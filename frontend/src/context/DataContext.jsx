import { createContext, useContext } from 'react';
import { useStore } from '../hook/useStore';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const store = useStore();

  return (
    <DataContext.Provider value={{ store }}>
      {children}
    </DataContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDataContext = () => useContext(DataContext);