import { useState, useEffect } from 'react';

const useLocalStorage = (key) => {
  const [token, setToken] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? storedValue : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem(key, token);
    } else {
      localStorage.removeItem(key);
    }
  }, [key, token]);

  const setTokenValue = (newToken) => {
    setToken(newToken);
  };

  const removeToken = () => {
    setToken(null);
  };

  const getToken = () => {
    return token;
  };

  const getDecodedToken = () => {
    try {
      const decodedValue = atob(token);
      const parsedValue = JSON.parse(decodedValue);
      return parsedValue;
    } catch (error) {
      console.error('token not found');
      return null;
    }
  };

  return [token, setTokenValue, removeToken, getToken, getDecodedToken];
};

export default useLocalStorage;