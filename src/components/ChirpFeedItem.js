import React, { useEffect, useState } from "react";
import ApiRequest from "../common/api";
import ChirpCommentForm from "../forms/ChirpCommentForm";
import useLocalStorage from "../hooks/useLocalStorage";


import '../styles/ChirpFeedItem.css'

const ChirpFeedItem = ({chirp, deleteChirp}) => {

  const [token, setTokenValue, removeToken, getToken, getDecodedToken] = useLocalStorage("token");
  const [currentUserId, setCurrentUserId] = useState(null)
  const [currentUserUsername, setCurrentUserUsername] = useState(null)
  const [displayLikes, setDisplayLikes] = useState(chirp.likes)
  const [likesButtonStatus, setLikesButtonStatus] = useState('on')
  const [commentBoxState, setCommentBoxState] = useState('closed')

  useEffect(() => {
    const user = getDecodedToken()
    setCurrentUserId(user.user_id)
    setCurrentUserUsername(user.username)
  }, [])
  
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  const addLikeToChirp = async () => {
    if (likesButtonStatus === 'on') {
      const addLikeToChirp = await ApiRequest.likeChirp(
        { 'chirp_id': chirp.id, 'user_id': currentUserId }
      )
      console.log(addLikeToChirp)
      setDisplayLikes(displayLikes + 1)
      setLikesButtonStatus('off')
    }
  }


  const openCommentBox = () => {
    if (commentBoxState === 'closed') {
      setCommentBoxState('open')
    } else {
      setCommentBoxState('closed')
    }
  }

  return (
    <div key={chirp.id} id="chirp-feed-item-container">
      {currentUserUsername === chirp.username &&
        <button
          id='chirp-feed-item-delete-button'
          onClick={() => deleteChirp(chirp.id)}>X</button>
      }
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
          <p>Likes: {displayLikes}</p>
        </div>
        <div id="rechirps-count-container">
          <button>test</button>
          <p>Rechirps: {chirp.rechirps}</p>
        </div>
        <div id="comments-count-container">
          <button onClick={openCommentBox}>add</button>
          <p>Comments: {chirp.comments}</p>
        </div>
      </div>
      <div className={`chirp-comment-form-outer-container-${commentBoxState}`}>
        <ChirpCommentForm 
          commentBoxState={commentBoxState}
          currentUserId={currentUserId}
          chirpId={chirp.id}
        />
      </div>
    </div>
  )
}

export default ChirpFeedItem;