import React, { useEffect, useState } from "react";
import ApiRequest from "../common/api";
import ChirpCommentForm from "../forms/ChirpCommentForm";
import useLocalStorage from "../hooks/useLocalStorage";


import '../styles/ChirpFeedItem.css'
import ChirpComments from "./ChirpComments";
import ChirpItemTags from "./ChirpItemTags";

const ChirpFeedItem = ({chirp, deleteChirp}) => {

  const [token, setTokenValue, removeToken, getToken, getDecodedToken] = useLocalStorage("token");
  const [currentUserId, setCurrentUserId] = useState(null)
  const [currentUserUsername, setCurrentUserUsername] = useState(null)
  const [displayLikes, setDisplayLikes] = useState(chirp.likes)
  const [displayCommentsCount, setDisplayCommentsCount] = useState(chirp.comments)
  const [likesButtonStatus, setLikesButtonStatus] = useState('on')
  const [addCommentBoxState, setAddCommentBoxState] = useState('closed')
  const [viewCommentsBoxState, setViewCommentsBoxState] = useState('closed')
  const [commentCount, setCommentCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);


  useEffect(() => {
    if (token) {
      const user = getDecodedToken()
      setCurrentUserId(user.user_id)
      setCurrentUserUsername(user.username)
    }    
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
      setDisplayLikes(displayLikes + 1)
      setLikesButtonStatus('off')
    }
  }

  const openAddCommentBox = () => {
    if (addCommentBoxState === 'closed') {
      setAddCommentBoxState('open')
    } else {
      setAddCommentBoxState('closed')
    }
  }

  const openViewCommentsBox = () => {
    if (viewCommentsBoxState === 'closed') {
      setViewCommentsBoxState('open')
    } else {
      setViewCommentsBoxState('closed')
    }
  }

  const handleHover = (isHovered) => {
    // console.log(`Hovering: ${isHovered ? "Yes" : "No"}`);
  };

  const bookmarkChirp = async (chirpId) => {
    const chirp_id = chirpId
    const user_id = currentUserId
    const bookmark = await ApiRequest.addBookmark(
      {user_id, chirp_id}
    )
    console.log(bookmark)
  }

  return (
    <div
      key={chirp.id}
      id="chirp-feed-item-container"
      onMouseEnter={() => {
        setIsHovered(true);
        handleHover(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        handleHover(false);
      }}
      >
      {currentUserUsername === chirp.username &&
        <button
          id='chirp-feed-item-delete-button'
          onClick={() => deleteChirp(chirp.id)}
        >Delete</button>
      }
      {token && 
        <button
          id="bookmark-icon"
          onClick={() => bookmarkChirp(chirp.id)}
        >Bookmark</button>
      }
      <div className="user-info">
        <div 
          className="avatar"
          style={{backgroundColor: chirp.avatar }}
        />
        <div className="user-info-text">
          <p className="display-name">{chirp.displayName}</p>
          <p className="chirp-feed-item-timestamp">{formatTimestamp(chirp.timestamp)}</p>
        </div>
      </div>
      <div className="main">
        {chirp.image !== '' && 
          <img className="chirp-image" src={chirp.image} alt="user-avatar" />
        }
        <h4 className="chirp-text" >{chirp.text}</h4>
        <div id="chirp-tags-outer-container">
          <ChirpItemTags
            chirpId={chirp.id}
            isHovered={isHovered}
          />
        </div>
      </div>
      <div className="bottom">
        <div id="likes-count-container">
          {token && 
            <button onClick={() => { addLikeToChirp() }}>like</button>
          }
          <p>Likes: {displayLikes}</p>
        </div>
        {/* <div id="rechirps-count-container">
          <button>test</button>
          <p>Rechirps: {chirp.rechirps}</p>
        </div> */}
        <div id="comments-count-container">
          {token && 
            <button onClick={openAddCommentBox}>add</button>
          }
          <button onClick={openViewCommentsBox}>view</button>
          <p>Comments: {displayCommentsCount}</p>
        </div>
      </div>
      <div className={`chirp-comment-form-outer-container-${addCommentBoxState}`}>
        <ChirpCommentForm 
          addCommentBoxState={addCommentBoxState}
          currentUserId={currentUserId}
          chirpId={chirp.id}
          onCommentSubmit={() => setCommentCount(commentCount + 1)}
          displayCommentsCount={displayCommentsCount}
          setDisplayCommentsCount={setDisplayCommentsCount}
          isHovered={isHovered}
        />
      </div>
      <div className={`chirp-view-comments-outer-container-${viewCommentsBoxState}`}>
        <ChirpComments
          viewCommentsBoxState={viewCommentsBoxState}
          chirpId={chirp.id}
          commentCount={commentCount}
        />
      </div>
    </div>
  )
}

export default ChirpFeedItem;