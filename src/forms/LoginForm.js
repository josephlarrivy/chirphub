import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiRequest from "../common/api";
import useLocalStorage from "../hooks/useLocalStorage";

import "../styles/LoginForm.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setTokenValue, removeToken, getToken, getDecodedToken] =
    useLocalStorage("token");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await ApiRequest.login({
      username,
      password,
    });
    if (response.status === 200) {
      setTokenValue(response.data.token);
    }
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div id="login-form-main-container">
      <form onSubmit={handleSubmit}>
        <label className="input-label">
          Username:
          <input
            type="text"
            value={username}
            className="login-input"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label className="input-label">
          Password:
          <input
            type="password"
            value={password}
            className="login-input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button className="login-submit-button" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
