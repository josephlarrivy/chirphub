import React, { useEffect, useState }from "react"
import { useNavigate } from "react-router-dom";

import ApiRequest from "../common/api";
import useLocalStorage from "../hooks/useLocalStorage";


const AddTagsToChirpForm = () => {

  const [token, setTokenValue, removeToken, getToken, getDecodedToken] = useLocalStorage("token");
  const [chirpId, setChirpId, removeChirpId, getChirpId, getDecodedChirpId] = useLocalStorage("chirpId");
  const navigate = useNavigate()
  const [tagInputOne, setTagInputOne] = useState('')
  const [tagInputTwo, setTagInputTwo] = useState('')
  const [tagInputThree, setTagInputThree] = useState('')

  useEffect(() => {
    const chirpIdInStorage = getChirpId()
    console.log(chirpIdInStorage)
  }, [])

  const handleTagInputOneChange = (event) => {
    const value = event.target.value;
    setTagInputOne(value)
  }
  const handleTagInputTwoChange = (event) => {
    const value = event.target.value;
    setTagInputTwo(value)
  }
  const handleTagInputThreeChange = (event) => {
    const value = event.target.value;
    setTagInputThree(value)
  }


  const submitTags = async () => {
    const tags = [tagInputOne, tagInputTwo, tagInputThree];

    for (let tag of tags) {
      if (tag !== '') {
        await ApiRequest.addTag(
          {
            'chirp_id' : chirpId,
            'tag_name' : tag
          }
        )
      }
    }
  };


  return (
    <div id="chirp-form-tags-input-container">
      <p>type up to three tags</p>
      <input
        id="chirp-form-tag-input-one"
        type='text'
        value={tagInputOne}
        onChange={handleTagInputOneChange}>
      </input>
      <input
        id="chirp-form-tag-input-two"
        type='text'
        value={tagInputTwo}
        onChange={handleTagInputTwoChange}>
      </input>
      <input
        id="chirp-form-tag-input-three"
        type='text'
        value={tagInputThree}
        onChange={handleTagInputThreeChange}>
      </input>
      <div className="tags-form-bottom">
        <button onClick={submitTags}>add tags</button>
      </div>
    </div>
  )
}

export default AddTagsToChirpForm;