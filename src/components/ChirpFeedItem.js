import React, { useEffect } from "react";

import '../styles/ChirpFeedItem.css'

const ChirpFeedItem = ({chirp}) => {

  useEffect(() => {
    // console.log(chirp)
  }, [])
  
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
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
        <img className="chirp-image" src={chirp.image} alt="user-avatar" />
        <h4 className="chirp-text" >{chirp.text}</h4>
      </div>
      <div className="bottom">
        <p>Likes: {chirp.likes}</p>
        <p>Rechirps: {chirp.rechirps}</p>
        <p>Comments: {chirp.comments}</p>
      </div>
    </div>
  )
}

export default ChirpFeedItem;