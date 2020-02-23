import React from "react";

const TopTitle = ({content}) => {
  return (
    <div className='col-sm-12 part-title'>
      <h1 className='title title-champagne'>{content}<br/><div className='title-deco'/></h1>
    </div>
  )
}

export default TopTitle;