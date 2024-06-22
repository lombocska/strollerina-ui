import React, { createContext, useContext, useState, useEffect } from 'react';

// Alapértelmezett állapot beállítása
const defaultState = {
  loaded: false,
  currency: 'USD',
  multiplicator: 1,
};

// Kontextus létrehozása
const CurrencyContext = createContext({
  state: defaultState,
  setCurrency: () => {}, // Alapértelmezett üres függvény
});

export const CurrencyProvider = ({ children }) => {
  const [state, setState] = useState(defaultState);

  const setCurrency = (currency) => {
    // Itt állítsuk be az új valutát és a multiplikátort
    const multiplicator = getMultiplicatorForCurrency(currency); // Példa funkció a multiplikátor lekérésére
    setState({
      ...state,
      currency,
      multiplicator,
    });
  };

  return (
    <CurrencyContext.Provider value={{ state, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

// Multiplikátor lekérése (példa funkció)
const getMultiplicatorForCurrency = (currency) => {
  switch (currency) {
    case 'USD':
      return 1;
    case 'EUR':
      return 0.85;
    case 'HUF':
      return 300;
    default:
      return 1;
  }
};

// Kontextus használata
export const useCurrency = () => useContext(CurrencyContext);
