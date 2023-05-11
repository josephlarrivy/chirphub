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

  

  const submitChirp = async () => {
    const currentTime = new Date();

    const user_id = currentUserInfo.user_id;
    const timestamp = currentTime.toISOString();
    const text = postTextInput;
    const image = postImageUrlInput;

    const chirpResponse = await ApiRequest.postChirp(
      {user_id, timestamp, text, image}).then()
    // console.log(chirpResponse.data.chirp_id)
    setChirpId(chirpResponse.data.chirp_id)

    navigate("/addTagsToChirpForm")
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
          <p>image url</p>
          <input
            id="chirp-form-url-input"
            type='text'
            value={postImageUrlInput}
            onChange={handlePostImageUrlInputChange}>
          </input>
          <p>chirp text</p>
          <input
            id="chirp-form-text-input"
            type='text'
            value={postTextInput}
            onChange={handlePostTextInputChange}>
          </input>
        </div>
        <div className="chirp-form-bottom">
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