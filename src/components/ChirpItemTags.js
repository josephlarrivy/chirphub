import React, { useEffect, useState } from "react";
import ApiRequest from "../common/api";


const ChirpItemTags = ({chirpId}) => {

  const [tags, setTags] = useState(null)
  
  const getTagsByChirpId = async () => {
    const dbTags = await ApiRequest.getTagsByChirpId(
      {'chirp_id' : chirpId}
    )
    console.log(dbTags)
    setTags(dbTags.data.data)
  }

  useEffect(() => {
    getTagsByChirpId()
  }, [])

  return(
    <div>
      {tags && tags.map(tag => {
        return(
          <button key={tag.tag_id} >{tag.tag_name}</button>
        )
      })}
    </div>
  )
}

export default ChirpItemTags;