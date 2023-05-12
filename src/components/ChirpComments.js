import React, { useEffect, useState } from "react";
import ApiRequest from "../common/api";


import '../styles/ChirpComments.css'

const ChirpComments = ({ viewCommentsBoxState, chirpId, commentCount }) => {

  const [comments, setComments] = useState(null)

  const getComments = async () => {
    const comments = await ApiRequest.getCommentsByChirpId(
      { 'chirp_id' : chirpId }
    )
    setComments(comments.data.data)
  }

  useEffect(() => {
    getComments()
  }, [commentCount])

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

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
          </div>
        )
      })}
    </div>
  )
}

export default ChirpComments;