import React, { useEffect, useState } from "react";



import '../styles/Feed.css'
import ChirpFeedItem from "./ChirpFeedItem";
import PostChirpForm from "../forms/PostChirpForm";
import ApiRequest from "../common/api";
import AddTagsToChirpForm from "../forms/AddTagsToChirpForm";

const Feed = () => {

  const [chirps, setChirps] = useState(null)
  const [postPhase, setPostPhase] = useState('chirp')

  const getChirps = async () => {
    const response = await ApiRequest.getChirps()
    setChirps(response.data.data)
  }

  const deleteChirp = async (chirpId) => {
  if (window.confirm("Are you sure you want to delete this chirp?")) {
    await ApiRequest.deleteChirp(
      { 'chirp_id': chirpId}
    );
    getChirps();
  }
};


  useEffect(() => {
    getChirps()
  }, [])


  return (
    <div id="feed-inner-container">
      {postPhase === 'chirp'
        ?
        <div id="post-chirp-form-container-chirp">
          <PostChirpForm 
            setPostPhase={setPostPhase}
          />
        </div>
        :
        <div id="post-chirp-form-container-tag">
          <AddTagsToChirpForm 
            setPostPhase={setPostPhase}
            getChirps={getChirps}
          />
        </div>
      }
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