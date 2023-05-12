import React, { useEffect, useState } from "react";
import ApiRequest from "../common/api";

import '../styles/ChirpCommentForm.css'

const ChirpCommentForm = ({ addCommentBoxState, currentUserId, chirpId, onCommentSubmit, displayCommentsCount, setDisplayCommentsCount }) => {

  const [commentTextInput, setCommentTextInput] = useState('')

  useEffect(() => {
    console.log(addCommentBoxState)
  },[addCommentBoxState])

  function countCharacters(str) {
    return str.length;
  }

  const handleCommentTextInputChange = (event) => {
    const value = event.target.value;
    setCommentTextInput(value);
  };

  const addCommentToChirp = async () => {
    const currentTime = new Date();

    const user_id = currentUserId;
    const timestamp = currentTime.toISOString();
    const text = commentTextInput;
    const chirp_id = chirpId;

    const commentResponse = await ApiRequest.postChirpComment(
      { user_id, timestamp, text, chirp_id }
    )
    // console.log(commentResponse)
    setCommentTextInput('')
    onCommentSubmit();
    setDisplayCommentsCount(displayCommentsCount + 1)
  }

  return(
    <div id={`chirp-comment-form-inner-container-${addCommentBoxState}`}>
      <div id="above-comment-box">
        <p id="remaining-character-count-comment">Remaining Characters: {290 - countCharacters(commentTextInput)}</p>
      </div>
      <textarea
        id="chirp-comment-form-text-input"
        type='text'
        value={commentTextInput}
        onChange={handleCommentTextInputChange}
        placeholder={'What\'s your reply?'}
        maxLength={290}>
      </textarea>
      <button onClick={addCommentToChirp} id="chirp-comment-submit-button">Comment</button>
    </div>
  )
}

export default ChirpCommentForm;