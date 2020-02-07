import React from 'react';

interface IEmojoy {
  name: string;
  special: boolean;
}

const Emojoy = ({name, special=false}: IEmojoy) => {
  return (
    <img 
      className={`emojoy ${special ? 'emojoy-big' : ''}`}
      src={`src/assets/images/emojoy/${name}.png`}
    />
  )
}

export default Emojoy;