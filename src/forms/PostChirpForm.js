import React from "react";
import ApiRequest from "../common/api";

const PostChirpForm = () => {


  const makeTestRequest = async () => {
    const response = await ApiRequest.test()
    console.log(response)
  }

  return (
    <div>
      <button onClick={() => {makeTestRequest()}}>TEST</button>

    </div>
  )
}

export default PostChirpForm;