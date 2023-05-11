import React, { useState } from "react";
import { ChromePicker } from "react-color";
import { useNavigate } from "react-router-dom";
import ApiRequest from "../common/api";
import useLocalStorage from "../hooks/useLocalStorage";


const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [displayname, setDisplayname] = useState("");
  const [avatarColor, setAvatarColor] = useState("#000000");
  const [password, setPassword] = useState("");
  const [token, setTokenValue, removeToken, getToken, getDecodedToken] = useLocalStorage('token');
  const navigate = useNavigate()


  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await ApiRequest.register({
      username,
      displayname,
      avatarColor,
      password,
    });    
    if (response.status === 200) {
      setTokenValue(response.data.token)
    }
    // navigate('/')
  };

  const handleColorChange = (color) => {
    setAvatarColor(color.hex);
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
          Display Name:
          <input
            type="text"
            value={displayname}
            onChange={(e) => setDisplayname(e.target.value)}
          />
        </label>
        <br />
        <label>
          Avatar Color:
          <ChromePicker color={avatarColor} onChange={handleColorChange} />
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;