import { useState, useEffect } from 'react';

const useLocalStorage = (key) => {
  const [token, setToken] = useState(localStorage.getItem(key));

  useEffect(() => {
    localStorage.setItem(key, token);
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
      return decodedValue;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  return [token, setTokenValue, removeToken, getToken, getDecodedToken];
};

export default useLocalStorage;

