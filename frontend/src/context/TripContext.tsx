import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TripContextType {
  tripData: any; // Use 'any' ou defina uma interface específica para os dados
  setTripData: React.Dispatch<React.SetStateAction<any>>;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tripData, setTripData] = useState<any>({});

  return (
    <TripContext.Provider value={{ tripData, setTripData }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};
