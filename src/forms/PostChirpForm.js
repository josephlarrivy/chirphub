import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiRequest from "../common/api";
import useLocalStorage from "../hooks/useLocalStorage";

import '../styles/PostChirpForm.css'

const PostChirpForm = () => {

  const [token, setTokenValue, removeToken, getToken, getDecodedToken] = useLocalStorage("token");
  const navigate = useNavigate()
  const [currentUserInfo, setCurrentUserInfo] = useState(null)
  const [postTextInput, setPostTextInput] = useState('')
  const [postImageUrlInput, setPostImageUrlInput] = useState('')

  useEffect(() => {
    const userInfo = getDecodedToken()
    console.log(userInfo)
    setCurrentUserInfo({ ...userInfo })
  }, [])

  function getCurrentTime() {
    const currentTime = new Date();
    const formattedTime = currentTime.toISOString();
    return formattedTime;
  }

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  const handlePostTextInputChange = (event) => {
    const value = event.target.value;
    setPostTextInput(value);
  };

  const handlePostImageUrlInputChange = (event) => {
    const value = event.target.value;
    setPostImageUrlInput(value)
  }

  const submitChirp = () => {
    console.log(postTextInput)
    console.log(postImageUrlInput)
    console.log(currentUserInfo.user_id)
  }

  if (token && currentUserInfo) {
    return (
      <div id="chirp-form-container">
        <div className="user-info">
          <div
            className="avatar"
            style={{ backgroundColor: currentUserInfo.avatar }}
          />
          <div className="user-info-text">
            <p className="display-name">{currentUserInfo.displayname}</p>
            <p className="timestamp">{formatTimestamp(getCurrentTime())}</p>
          </div>
        </div>
        <div className="main">
          <input
            type='text'
            value={postTextInput}
            onChange={handlePostTextInputChange}>
          </input>
          <br></br>
          <input
            type='text'
            value={postImageUrlInput}
            onChange={handlePostImageUrlInputChange}>
          </input>
        </div>
        <div className="bottom">
          <button onClick={submitChirp} >Chirp</button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p>Must log in to Chirp</p>
        <button onClick={() => {navigate('/register')}}>Register</button>
        <button onClick={() => { navigate('/login') }}>Log In</button>
      </div>
    );
  }
};

export default PostChirpForm;