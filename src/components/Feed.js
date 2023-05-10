import React, { useEffect, useState } from "react";



import '../styles/Feed.css'
import fakeChirps from "../fake-data/fake-chirps";
import ChirpFeedItem from "./ChirpFeedItem";
import PostChirpForm from "../forms/PostChirpForm";

const Feed = () => {

  const [chirps, setChirps] = useState(null)

  useEffect(() => {
    fakeChirps.map(chirp => {
      // console.log(chirp)
      setChirps(fakeChirps)
    })
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
          />
        )
      })}
    </div>
  )
}

export default Feed;