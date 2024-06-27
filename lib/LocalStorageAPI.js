import { useState, useEffect } from "react";

function getStorageValue(key, defaultValue) {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    if (saved) {
      const initial = JSON.parse(saved);
      if (Array.isArray(initial)) {
        return new Set(initial);
      }
      return initial;
    }
  }
  return defaultValue;
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => getStorageValue(key, defaultValue));

  useEffect(() => {
    if (typeof window !== "undefined") {
      const valueToStore = value instanceof Set ? Array.from(value) : value;
      localStorage.setItem(key, JSON.stringify(valueToStore));
    }
  }, [key, value]);

  return [value, setValue];
};

export const clearLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};
