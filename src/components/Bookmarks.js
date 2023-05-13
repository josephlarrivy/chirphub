import React, { useEffect, useState } from "react";
import ApiRequest from "../common/api";

import useLocalStorage from "../hooks/useLocalStorage";
import ChirpFeedItem from "./ChirpFeedItem";



const Bookmarks = () => {

  const [token, setTokenValue, removeToken, getToken, getDecodedToken] = useLocalStorage("token");
  const [currentUserInfo, setCurrentUserInfo] = useState(null)
  const [currentUserId, setCurrentUserId] = useState(null)
  const [chirps, setChirps] = useState(null)

  const getChirps = async (user_id) => {
    const dbChirps = await ApiRequest.getBookmarkedChirpsByUser(
      { user_id }
    )
    setChirps(dbChirps.data.data)
  }
  
  useEffect(() => {
    const userInfo = getDecodedToken()
    setCurrentUserInfo({ ...userInfo })
    // console.log(userInfo.user_id)
    getChirps(userInfo.user_id)

    if (token) {
      const user = getDecodedToken()
      setCurrentUserId(user.user_id)
      // setCurrentUserUsername(user.username)
      // getUserBookmarks(user.user_id)
    }

  }, [])

  const deleteChirp = async (chirpId) => {
    if (window.confirm("Are you sure you want to delete this chirp?")) {
      await ApiRequest.deleteChirp(
        { 'chirp_id': chirpId }
      );
      getChirps(currentUserInfo.user_id);
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


  return (
    <>
    <h3 style={{textAlign: 'center'}}>Chirps that you've bookmarked</h3>
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
    </>
  )
}

export default Bookmarks;