import React from 'react';

const Title = ({content}) => {
  return (
    <div className='col-sm-12 part-title'>
      <h2 className='title title-champagne'>${content}<br/><div className='title-deco'/></h2>
    </div>
  )
}

export default Title;