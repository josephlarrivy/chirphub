import React, { useEffect, useState } from "react";
import ApiRequest from "../common/api";
import useLocalStorage from "../hooks/useLocalStorage";


import '../styles/ChirpFeedItem.css'

const ChirpFeedItem = ({chirp}) => {

  const [token, setTokenValue, removeToken, getToken, getDecodedToken] = useLocalStorage("token");
  const [currentUserId, setCurrentUserId] = useState(null)

  useEffect(() => {
    // console.log(chirp)
    const user = getDecodedToken()
    // console.log(user.user_id)
    setCurrentUserId(user.user_id)
  }, [])
  
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  const addLikeToChirp = async () => {
    // console.log(chirp.id)
    // console.log(currentUserId)
    const addLikeToChirp = await ApiRequest.likeChirp(
      { 'chirp_id': chirp.id, 'user_id': currentUserId }
    )
    console.log(addLikeToChirp)
  }

  return (
    <div key={chirp.id} id="chirp-feed-item-container">
      <div className="user-info">
        <div 
          className="avatar"
          style={{backgroundColor: chirp.avatar }}
        />
        <div className="user-info-text">
          <p className="display-name">{chirp.displayName}</p>
          <p className="timestamp">{formatTimestamp(chirp.timestamp)}</p>
        </div>
      </div>
      <div className="main">
        {chirp.image !== '' && 
          <img className="chirp-image" src={chirp.image} alt="user-avatar" />
        }
        <h4 className="chirp-text" >{chirp.text}</h4>
      </div>
      <div className="bottom">
        <div id="likes-count-container">
          <button onClick={() => { addLikeToChirp() }}>like</button>
          <p>Likes: {chirp.likes}</p>
        </div>
        <div id="rechirps-count-container">
          <button>test</button>
          <p>Rechirps: {chirp.rechirps}</p>
        </div>
        <div id="comments-count-container">
          <button>test</button>
          <p>Comments: {chirp.comments}</p>
        </div>
      </div>
    </div>
  )
}

export default ChirpFeedItem;