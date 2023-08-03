import React from 'react'


// Restaurant Info will display restaurant details such as cuisine, address, hours, description
const RestaurantInfo = ({restaurant}) => {
  // get fetch API data for a given restaurant

  return (
    <div className='restaurantInfo'>
      <dl className='restaurantDL'>
        <div className='DL-item'>
          <dt className='infoLabel'>Cuisine</dt>
          <dd className='infoValue'>{restaurant.cuisine}</dd>
        </div>
        <div className='DL-item'>
          <dt className='infoLabel'>Address</dt>
          <dd className='infoValue'>Store Info from API</dd>
        </div>
        <div className='DL-item'>
          <dt className='infoLabel'>Hours</dt>
          <dd className='infoValue'>Store Info from API</dd>
        </div>
        <div className='DL-item'>
          <dt className='infoLabel'>Description</dt>
          <dd className='infoValue'>Store Info from API</dd>
        </div>
      </dl>
    </div>
  );
};

export default RestaurantInfo