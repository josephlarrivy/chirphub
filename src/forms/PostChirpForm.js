import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiRequest from "../common/api";
import useLocalStorage from "../hooks/useLocalStorage";

import '../styles/PostChirpForm.css'

const PostChirpForm = () => {

  const [token, setTokenValue, removeToken, getToken, getDecodedToken] = useLocalStorage("token");
  const [chirpId, setChirpId, removeChirpId, getChirpId, getDecodedChirpId] = useLocalStorage("chirpId");
  const navigate = useNavigate()
  const [currentUserInfo, setCurrentUserInfo] = useState(null)
  const [postImageUrlInput, setPostImageUrlInput] = useState('')
  const [postTextInput, setPostTextInput] = useState('')

  
  useEffect(() => {
    const userInfo = getDecodedToken()
    setCurrentUserInfo({ ...userInfo })
    removeChirpId()
  }, [])

  const combinedDate = () => {
    const currentTime = new Date();
    return currentTime.toLocaleString();
  }

  const handlePostImageUrlInputChange = (event) => {
    const value = event.target.value;
    setPostImageUrlInput(value)
  }

  const handlePostTextInputChange = (event) => {
    const value = event.target.value;
    setPostTextInput(value);
  };

  function countCharacters(str) {
    return str.length;
  }

  const submitChirp = async () => {
    const currentTime = new Date();

    const user_id = currentUserInfo.user_id;
    const timestamp = currentTime.toISOString();
    const text = postTextInput;
    const image = postImageUrlInput;

    const chirpResponse = await ApiRequest.postChirp(
      { user_id, timestamp, text, image }
    )
    // console.log(chirpResponse.data.chirp_id)
    setChirpId(chirpResponse.data.chirp_id)

    setTimeout(() => {
      navigate("/addTagsToChirpForm")
    }, 1000)
  }

  if (token && currentUserInfo) {
    return (
      <div id="chirp-form-container">
        <div className="chirp-form-user-info">
          <div
            className="chirp-form-avatar"
            style={{ backgroundColor: currentUserInfo.avatar }}
          />
          <div className="chirp-form-user-info-text">
            <p className="chirp-form-display-name">{currentUserInfo.displayname}</p>
            <p className="chirp-form-timestamp">{combinedDate()}</p>
          </div>
        </div>
        <div className="chirp-form-main">
          {/* <p>image url</p> */}
          {/* <input
            id="chirp-form-url-input"
            type='text'
            value={postImageUrlInput}
            onChange={handlePostImageUrlInputChange}>
          </input> */}
          {/* <p>chirp text</p> */}
          <p id="remaining-character-count">Remaining Characters: {290 - countCharacters(postTextInput)}</p>
          <textarea
            id="chirp-form-text-input"
            type='text'
            value={postTextInput}
            onChange={handlePostTextInputChange}
            placeholder={'What\'s on your mind?'}
            maxLength={290}>
          </textarea>
        </div>
        <div className="chirp-form-bottom">
          <button id="post-chirp-button" onClick={submitChirp}>Chirp</button>
        </div>
      </div>
    );
  } else {
    return (
      <div id="user-not-logged-in-container">
        <h3>Please log in or register to Chirp</h3>
        <button className="login-or-register-button" onClick={() => {navigate('/register')}}>Register</button>
        <button className="login-or-register-button" onClick={() => { navigate('/login') }}>Log In</button>
      </div>
    );
  }
};

export default PostChirpForm;