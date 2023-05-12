import React, { useEffect, useState } from "react";



import '../styles/Feed.css'
import fakeChirps from "../fake-data/fake-chirps";
import ChirpFeedItem from "./ChirpFeedItem";
import PostChirpForm from "../forms/PostChirpForm";
import ApiRequest from "../common/api";

const Feed = () => {

  const [chirps, setChirps] = useState(null)

  const getChirps = async () => {
    const response = await ApiRequest.getChirps()
    setChirps(response.data.data)
  }

  const deleteChirp = async (chirpId) => {
    await ApiRequest.deleteChirp(
      { 'chirp_id': chirpId}
    );
    getChirps();
  };

  useEffect(() => {
    getChirps()
  }, [])

  return (
    <div id="feed-inner-container">
      <div id="post-chirp-form-container">
        <PostChirpForm />
      </div>
      {chirps && chirps.map(chirp => {
        return(
          <ChirpFeedItem 
            key={chirp.id}
            chirp={chirp}
            deleteChirp={deleteChirp}
          />
        )
      })}
    </div>
  )
}

export default Feed;