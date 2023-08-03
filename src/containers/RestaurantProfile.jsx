import React from 'react'
import RestaurantInfo from '../components/RestaurantInfo';
import ReviewsDisplay from '../components/ReviewsDisplay';
import ReviewContainer from './ReviewContainer';

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

  // Example Object from API
  // const APIobj = {
  //   name: result.name,
  //   address: result.formatted_address,
  //   isOpen: result.opening_hours ? result.opening_hours.open_now : undefined,
  //   rating: result.rating,
  //   priceLevel: result.price_level,
  //   placeId: result.place_id,
  //   numberOfratings: results.user_ratings_total
  //   // Add any other data you might find useful
  // };



  return (
    <div className='restaurantBox'>
      {restaurant.name}
      {/* add starts based on rating */}
      <div>
        <RestaurantInfo restaurant={restaurant} />
      </div>
      <div>
        <ReviewsDisplay/>
      </div>
      <div>
        <ReviewContainer />
      </div>
    </div>
  );
}

export default RestaurantProfile