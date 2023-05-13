import React from "react";

import '../styles/BallMoveDiv.css'


// render these with the text that it will display and the internal route that they should link to
{/* <BallMoveDiv text='xxx' route='/here' /> */ }

const BallMoveDiv = ({ text, route }) => {

  return (
    <a href={route}>
      <div className='ball-move-div-container'>
        <h4>{text}</h4>
        <div className='ball-move-div-large-ball'>
          <div className='ball-move-div-small-ball'></div>
        </div>
      </div>
    </a>
  )
}

export default BallMoveDiv;