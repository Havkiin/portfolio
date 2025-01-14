import React, { createContext, useContext, useState } from "react";

type NavigationType = "direct" | "in-app";

interface NavigationContextType {
  navigationType: NavigationType;
  setNavigationType: (type: NavigationType) => void;
  previousPage: string | null;
  setPreviousPage: (page: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (!context) throw new Error("useNavigationContext must be used within a NavigationProvider");
  return context;
};

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [navigationType, setNavigationType] = useState<NavigationType>("direct");
  const [previousPage, setPreviousPage] = useState<string | null>(null);

  return (
    <NavigationContext.Provider value={{ navigationType, setNavigationType, previousPage, setPreviousPage }}>
      {children}
    </NavigationContext.Provider>
  );
};
