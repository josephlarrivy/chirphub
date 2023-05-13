import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiRequest from "../common/api";
import ChirpFeedItem from "./ChirpFeedItem";
import useLocalStorage from "../hooks/useLocalStorage";


import '../styles/ChirpsByTag.css'

const ChirpsByTag = () => {

  const [token, setTokenValue, removeToken, getToken, getDecodedToken] = useLocalStorage("token");
  const [currentUserId, setCurrentUserId] = useState(null)
  const tagId = useParams()
  const navigate = useNavigate()
  const [chirps, setChirps] = useState(null)
  const [tagsList, setTagsList] = useState(null)

  const getChirps = async () => {
    const dbChirps = await ApiRequest.getChirpsByTagId(
      { 'tag_id': tagId }
    )
    console.log(dbChirps)
    setChirps(dbChirps.data.data)
  }
  

  const getAllOtherTags = async () => {
    const dbTags = await ApiRequest.getAllTagsAsObjects()
    // console.log(dbTags.data.data)
    setTagsList(dbTags.data.data)
  }

  const deleteChirp = async (chirpId) => {
  if (window.confirm("Are you sure you want to delete this chirp?")) {
    await ApiRequest.deleteChirp(
      { 'chirp_id': chirpId}
    );
    getChirps();
    }
  };

  const deleteChirpBookmark = async (chirpId, userId) => {
    const chirp_id = chirpId
    const user_id = userId
    const bookmark = await ApiRequest.removeBookmark(
      { user_id, chirp_id }
    )
    console.log(bookmark)
    getChirps(currentUserId)
  }


  useEffect(() => {
    getChirps()
    getAllOtherTags()
  }, [tagId])

  return (
    <div id="feed-by-tags-inner-container">
      <div id="list-of-tags-container">
        <h3>Select a tag to see chirps</h3>
        {tagsList && tagsList.map(tag => {
          // console.log(tagId)
          // console.log(tag.tagId)
          if (tagId.tagId === tag.tagId) {
            return (
              <button
                key={tag.tag_id}
                className='tag-active'
                onClick={() => { navigate(`/tag/${tag.tagId}`) }}
              >{tag.tagName}</button>
            )
          } else {
            return (
              <button
                key={tag.tag_id}
                className='tag-inactive'
                onClick={() => { navigate(`/tag/${tag.tagId}`) }}
              >{tag.tagName}</button>
            )
          }
          
        })}
      </div>
      {chirps && chirps.map(chirp => {
        return (
          <ChirpFeedItem
            key={chirp.id}
            chirp={chirp}
            deleteChirp={deleteChirp}
            deleteChirpBookmark={deleteChirpBookmark}
          />
        )
      })}
    </div>
  )
}

export default ChirpsByTag;