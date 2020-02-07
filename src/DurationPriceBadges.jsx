import React from 'react';

const DurationPriceBadges = ({price, duration}) => {
  return (
    <div className='duration-price'>
<span class="badge badge-primary">{duration}mn</span> <span class="badge badge-info">{price}€</span>
    </div>
  )
}

export default DurationPriceBadges;