import React from 'react'
import RestaurantInfo from '../components/RestaurantInfo';

const RestaurantProfile = () => {
  
  // need to add stars feature based on ratings


  // get fetch API data for a given restaurant

  // dummy data
  const restaurant = {
    name: 'AYO Restaurant',
    cuisine: 'Mexican',
    address: '3302 One St, San Diego, CA 12345',
    isOpen: true,
    hours: '',
    description: '',
    rating: '3.5'
  };


  return (
    <div className='restaurantBox'>
      Restaurant Name here
      {/* add starts based on rating */}
      <div>
        <RestaurantInfo restaurant={restaurant}/>
      </div>
      <div>Review Dsiplay</div>
    </div>
  );
}

export default RestaurantProfile