import { createContext, useState, useContext } from 'react';

const PaymentContext = createContext();


export const PaymentProvider = ({ children }) => {
  const [isOnlineMode, setIsOnlineMode] = useState(false);

  const contextValue = {
    isOnlineMode,
    setIsOnlineMode,
  };

  return (
    <PaymentContext.Provider value={contextValue}>
      {children}
    </PaymentContext.Provider>
  );
};

// Hook personalizado para facilitar o acesso ao contexto
export const usePaymentContext = () => useContext(PaymentContext);
