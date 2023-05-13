import React, { useEffect, useState }from "react"
import { useNavigate } from "react-router-dom";

import ApiRequest from "../common/api";
import useLocalStorage from "../hooks/useLocalStorage";

import '../styles/AddTagsToChirpForm.css'


const AddTagsToChirpForm = ({ postPhase, setPostPhase, getChirps }) => {

  const [token, setTokenValue, removeToken, getToken, getDecodedToken] = useLocalStorage("token");
  const [chirpId, setChirpId, removeChirpId, getChirpId, getDecodedChirpId] = useLocalStorage("chirpId");
  const navigate = useNavigate()
  const [tagInputOne, setTagInputOne] = useState('')
  const [tagInputTwo, setTagInputTwo] = useState('')
  const [tagInputThree, setTagInputThree] = useState('')
  const [currentUserInfo, setCurrentUserInfo] = useState(null)
  const [existingTags, setExistingTags] = useState(null)
  const [tagCount, setTagCount] = useState(0)


  const getAllExistingTags = async () => {
    const dbTags = await ApiRequest.getAllTagsAsObjects()
    // console.log(dbTags.data.data)
    setExistingTags(dbTags.data.data)
  }


  useEffect(() => {
    const userInfo = getDecodedToken()
    setCurrentUserInfo({ ...userInfo })
    const chirpIdInStorage = getChirpId()
    getAllExistingTags()
  }, [])

  const combinedDate = () => {
    const currentTime = new Date();
    return currentTime.toLocaleString();
  }

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

  const addTagToChirp = async (tagName) => {
    await ApiRequest.addTag(
      {
        'chirp_id': chirpId,
        'tag_name': tagName
      }
    )
    setTagCount(tagCount+1)
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
    setTimeout(() => {
      removeChirpId()
      // navigate("/")
      getChirps()
      setPostPhase('transition-chirp')
    }, 1000)
  };

  if (tagCount === 3) {
    submitTags()
  }
  

  if (token && currentUserInfo) {
    return (
      <div id="chirp-form-tags-input-container">
        {/* <div className="chirp-form-user-info">
          <div
            className="chirp-form-avatar"
            style={{ backgroundColor: currentUserInfo.avatar }}
          />
          <div className="chirp-form-user-info-text">
            <p className="chirp-form-display-name">{currentUserInfo.displayname}</p>
            <p className="chirp-form-timestamp">{combinedDate()}</p>
          </div>
        </div> */}
        <p id="add-tags-to-chirp-form-text">Click to add existing tags or create your own. Limit 3.</p>
        <div id="add-tags-to-chirp-existing-tags-container">
          {existingTags && existingTags.map(tag => {
            return (
              <button
                key={tag.tagId}
                className='existing-tag'
                onClick={() => { addTagToChirp(tag.tagName) }}
              >{tag.tagName}</button>
            )
          })}
        </div>
        <div id="add-tags-to-chirp-form-area">
          {tagCount <= 0 &&
            <input
              id="chirp-form-tag-input-one"
              type='text'
              value={tagInputOne}
              onChange={handleTagInputOneChange}>
            </input>
          }
          {tagCount <= 1 &&
            <input
              id="chirp-form-tag-input-two"
              type='text'
              value={tagInputTwo}
              onChange={handleTagInputTwoChange}>
            </input>
          }
          {tagCount <= 2 &&
            <input
              id="chirp-form-tag-input-three"
              type='text'
              value={tagInputThree}
              onChange={handleTagInputThreeChange}>
            </input>
          }
          <div className="tags-form-bottom">
            <button id="add-tags-to-chirp-form-sumbit" onClick={submitTags}>Add Tags</button>
            {tagCount === 0 
              ? <button id="add-tags-to-chirp-form-sumbit" onClick={submitTags}>Skip Tags</button>
              : <button id="add-tags-to-chirp-form-sumbit" onClick={submitTags}>Done</button>
            }
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div id="user-not-logged-in-container">
        <h3>Please log in or register to Chirp</h3>
        <button className="login-or-register-button" onClick={() => { navigate('/register') }}>Register</button>
        <button className="login-or-register-button" onClick={() => { navigate('/login') }}>Log In</button>
      </div>
    );
  }
}

export default AddTagsToChirpForm;