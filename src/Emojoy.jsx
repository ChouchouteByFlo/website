import React from "react";

const Emojoy = ({name, special=false}) => {
  return (
    <img 
      className={`emojoy ${special ? 'emojoy-big' : ''}`}
      src={`src/assets/images/emojoy/${name}.png`}
    />
  )
}

export default Emojoy;