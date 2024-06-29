import React, { createContext, useContext, useState } from 'react';

// Alapértelmezett állapot beállítása
const defaultState = {
  loaded: false,
  currency: 'EUR',  // Alapértelmezett valuta EUR
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
    case 'EUR':
      return 1;
    case 'HUF':
      return 395;
    default:
      return 1;
  }
};

// Kontextus használata
export const useCurrency = () => useContext(CurrencyContext);
