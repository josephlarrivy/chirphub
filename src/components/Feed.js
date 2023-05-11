import React, { useEffect, useState } from "react";



import '../styles/Feed.css'
import fakeChirps from "../fake-data/fake-chirps";
import ChirpFeedItem from "./ChirpFeedItem";
import PostChirpForm from "../forms/PostChirpForm";
import ApiRequest from "../common/api";

const Feed = () => {

  const [chirps, setChirps] = useState(null)

  useEffect(() => {

    const getChirps = async () => {
      const response = await ApiRequest.getChirps()
      console.log(response.data.data)
      setChirps(response.data.data)
    }
    getChirps()

    // fakeChirps.map(chirp => {
    //   setChirps(fakeChirps)
    // })
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