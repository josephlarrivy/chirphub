import React, { useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import { useNavigate } from "react-router-dom";
import ApiRequest from "../common/api";
import useLocalStorage from "../hooks/useLocalStorage";

import '../styles/RegisterForm.css'

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [displayname, setDisplayname] = useState("");
  const [avatarColor, setAvatarColor] = useState("#000000");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordWarning, setPasswordWarning] = useState(null)
  const [token, setTokenValue, removeToken, getToken, getDecodedToken] = useLocalStorage('token');
  const navigate = useNavigate()
  const [error, setError] = useState(null)


  useEffect(() => {
    if (password !== confirmPassword) {
      setPasswordWarning('passwords do not match')
    } else if (password === confirmPassword) {
      setPasswordWarning('passwords match')
    }
  }, [password, confirmPassword])


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await ApiRequest.register({
        username,
        displayname,
        avatarColor,
        password,
      });
      setTokenValue(response.data.token);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (e) {
      console.log(e);
      navigate('/register');
      if (e.response && e.response.data && e.response.data.error) {
        setError(e.response.data.error);
      } else {
        setError('Username taken. Please pick another.');
      }
    }
  };


  const handleColorChange = (color) => {
    setAvatarColor(color.hex);
  };

  return (
    <div id="register-form-main-container">
      <form onSubmit={handleSubmit}>
        <p className="input-label" >Username:</p>
          <input
            type="text"
            value={username}
            id='register-username-input'
            onChange={(e) => setUsername(e.target.value)}
          />
        <br />
        <p className="input-label" >Display Name:</p>
          <input
            type="text"
            value={displayname}
            id='register-displayname-input'
            onChange={(e) => setDisplayname(e.target.value)}
          />
        <br />
        <p className="input-label" >Password:</p>
          <input
            type="password"
            value={password}
            id='register-password-input'
            onChange={(e) => setPassword(e.target.value)}
          />
        <br />
        <p className="input-label" >Confirm Password:</p>
        <input
          type="password"
          value={confirmPassword}
          id='register-confirm-password-input'
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />
        {password !== '' && passwordWarning && <p id="password-warning">{passwordWarning}</p>}
        <br />
        {/* <div
          id="avatar-color-preview"
          style={{ backgroundColor: avatarColor }}
        />  */}
        <label>
          Avatar Color:
          <ChromePicker color={avatarColor} onChange={handleColorChange} />
        </label>
        {error && <p>{error}</p>}
        <button id="register-form-submit" type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;