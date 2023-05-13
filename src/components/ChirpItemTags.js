import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiRequest from "../common/api";

import '../styles/ChirpItemTags.css'

const ChirpItemTags = ({chirpId}) => {

  const [tags, setTags] = useState(null)
  const navigate = useNavigate()
  
  const getTagsByChirpId = async () => {
    const dbTags = await ApiRequest.getTagsByChirpId(
      {'chirp_id' : chirpId}
    )
    setTags(dbTags.data.data)
  }

  useEffect(() => {
    getTagsByChirpId()
  }, [])

  return(
    <div id="chirp-item-tags-container">
      {tags && tags.map(tag => {
        const tagId = tag.tag_id
        return(
          <button
            key={tag.tag_id}
            onClick={() => {navigate(`/tag/${tagId}`)}}
          >{tag.tag_name}</button>
        )
      })}
    </div>
  )
}

export default ChirpItemTags;