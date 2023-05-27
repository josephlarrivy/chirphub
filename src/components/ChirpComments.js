import React, { useEffect, useState } from "react";
import ApiRequest from "../common/api";
import useLocalStorage from "../hooks/useLocalStorage";


import '../styles/ChirpComments.css'

const ChirpComments = ({ viewCommentsBoxState, chirpId, commentCount, chirpOwnerUsername }) => {

  const [token, setTokenValue, removeToken, getToken, getDecodedToken] = useLocalStorage("token");
  const [comments, setComments] = useState(null)
  const [currentUserUsername, setCurrentUserUsername] = useState(null)

  const getComments = async () => {
    const comments = await ApiRequest.getCommentsByChirpId(
      { 'chirp_id' : chirpId }
    )
    setComments(comments.data.data)
  }

  useEffect(() => {
    getComments()
    if (token) {
      const user = getDecodedToken()
      // setCurrentUserId(user.user_id)
      setCurrentUserUsername(user.username)
    }
  }, [commentCount])

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  const deleteComment = async (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      await ApiRequest.deleteComment(
        { 'comment_id': commentId }
      );
      getComments();
    }
  };

  return (
    <div id={`chirp-comments-inner-container-${viewCommentsBoxState}`}>
      <h4>Comments:</h4>
      {comments && comments.map(comment => {
        return(
          <div key={comment.timestamp} className="individual-comment-container">
            <div
              className="commenter-avatar"
              style={{ backgroundColor: comment.avatar }}
            />
            
            <div id="chirp-comment-info">
              <p>{comment.displayName}</p>
              <p id="comment-timestamp">{formatTimestamp(comment.timestamp)}</p>
              <p><b>{comment.text}</b></p>
            </div>
            {currentUserUsername === comment.username
              || currentUserUsername === chirpOwnerUsername
              ?
              <button
                id='chirp-feed-item-delete-button'
                onClick={() => deleteComment(comment.id)}
              >Delete</button>
              : <></>
            }
          </div>
        )
      })}
    </div>
  )
}

export default ChirpComments;