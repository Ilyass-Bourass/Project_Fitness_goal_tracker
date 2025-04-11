import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Récupérer la valeur depuis localStorage
  const getStoredValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Erreur lors de la lecture du localStorage:", error);
      return initialValue;
    }
  };

  // État qui conserve la valeur
  const [storedValue, setStoredValue] = useState(getStoredValue);

  // Fonction pour mettre à jour la valeur dans le state et localStorage
  const setValue = (value) => {
    try {
      // Permettre à la valeur d'être une fonction (comme dans setState)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Sauvegarder dans le state
      setStoredValue(valueToStore);
      // Sauvegarder dans localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Erreur lors de l'écriture dans le localStorage:", error);
    }
  };

  // Mettre à jour storedValue si la clé change
  useEffect(() => {
    setStoredValue(getStoredValue());
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage;