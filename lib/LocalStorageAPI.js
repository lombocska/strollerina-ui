
import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const isClient = typeof window === "object"; // Ellenőrzés, hogy van-e böngésző környezet
  
  const [storedValue, setStoredValue] = useState(() => {
    if (!isClient) {
      // Szerveroldalon nincs localStorage
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error retrieving localStorage item:", error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      if (isClient) {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error("Error setting localStorage item:", error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;

export const clearLocalStorage = (key) => {
  localStorage.removeItem(key);
}