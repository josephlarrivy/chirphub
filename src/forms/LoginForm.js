import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiRequest from "../common/api";
import useLocalStorage from "../hooks/useLocalStorage";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setTokenValue, removeToken, getToken, getDecodedToken] = useLocalStorage('token');
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await ApiRequest.login({
      username,
      password,
    });
    if (response.status === 200) {
      setTokenValue(response.data.token)
    }
    // navigate('/')
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginForm;