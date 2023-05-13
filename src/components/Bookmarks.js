import React, { useEffect, useState } from "react";
import ApiRequest from "../common/api";

import useLocalStorage from "../hooks/useLocalStorage";
import ChirpFeedItem from "./ChirpFeedItem";



const Bookmarks = () => {

  const [token, setTokenValue, removeToken, getToken, getDecodedToken] = useLocalStorage("token");
  const [currentUserInfo, setCurrentUserInfo] = useState(null)
  const [chirps, setChirps] = useState(null)

  const getChirps = async (user_id) => {
    const dbChirps = await ApiRequest.getBookmarkedChirpsByUser(
      { user_id }
    )
    // console.log(dbChirps.data.data)
    setChirps(dbChirps.data.data)
  }
  
  useEffect(() => {
    const userInfo = getDecodedToken()
    setCurrentUserInfo({ ...userInfo })
    // console.log(userInfo.user_id)
    getChirps(userInfo.user_id)
  }, [])

  const deleteChirp = async (chirpId) => {
    if (window.confirm("Are you sure you want to delete this chirp?")) {
      await ApiRequest.deleteChirp(
        { 'chirp_id': chirpId }
      );
      getChirps();
    }
  };
  return (
    <>
    <h3 style={{textAlign: 'center'}}>Chirps that you've bookmarked</h3>
      {chirps && chirps.map(chirp => {
        return (
          <ChirpFeedItem
            key={chirp.id}
            chirp={chirp}
            deleteChirp={deleteChirp}
          />
        )
      })}
    </>
  )
}

export default Bookmarks;