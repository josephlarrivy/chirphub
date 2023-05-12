import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiRequest from "../common/api";
import ChirpFeedItem from "./ChirpFeedItem";

import '../styles/ChirpsByTag.css'

const ChirpsByTag = () => {

  const tagId = useParams()
  const [chirps, setChirps] = useState(null)

  const getChirps = async () => {
    const tag_id = tagId
    const dbChirps = await ApiRequest.getChirpsByTagId(
      { 'tag_id': tagId }
    )
    console.log(dbChirps)
    setChirps(dbChirps.data.data)
  }

  const deleteChirp = async (chirpId) => {
    await ApiRequest.deleteChirp(
      { 'chirp_id': chirpId }
    );
    getChirps();
  };

  useEffect(() => {
    getChirps()
  }, [tagId])

  return (
    <div id="feed-by-tags-inner-container">
      <div id="list-of-tags-container">
        {/* <PostChirpForm /> */}
      </div>
      {chirps && chirps.map(chirp => {
        return (
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

export default ChirpsByTag;