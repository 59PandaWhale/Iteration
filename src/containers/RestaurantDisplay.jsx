import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateRest } from '../features/restaurantsSlice';
import RestaurantCard from '../components/RestaurantCard.jsx';
//import that slice of state here

const RestaurantDisplay = () => {
  //get the updated array of Restaurants from state
  const restaurant = useSelector((state) => state.restaurants.restList);
  // here can we initialize restaurant to get request to all restaurants?
  const dispatch = useDispatch();
  // do a get request to all of our restaurants

 
  // grab that data --> array of objects

  // invoke updateRest to update our restaurant state

  // restaurant
  //create an array to store all of the different RestaurantCards
  const displayArray = [];

  //iterate through the array of Restaurant objects
  restaurant.forEach((el, index) => {
    displayArray.push(<RestaurantCard key={index} info={el} />);
  });


  return <div className='resDisplay'>{displayArray}</div>;
};

export default RestaurantDisplay;
  //example object: 
  /*
   {
    business_status: 'OPERATIONAL',
    geometry: { location: [Object], viewport: [Object] },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: "Ann Marie's Corned Beef",
    opening_hours: { open_now: false },
    photos: [ [Object] ],
    place_id: 'ChIJM4wnjP8hJYgRvYu8r3sQSnw',
    plus_code: {
      compound_code: 'J3HW+36 Clinton Township, MI, USA',
      global_code: '86JVJ3HW+36'
    },
    price_level: 1,
    rating: 4.5,
    reference: 'ChIJM4wnjP8hJYgRvYu8r3sQSnw',
    scope: 'GOOGLE',
    types: [ 'restaurant', 'food', 'point_of_interest', 'establishment' ],
    user_ratings_total: 40,
    vicinity: '21312 Hall Road, Clinton Township',
    details: {
      name: "Ann Marie's Corned Beef",
      rating: 4.5,
      reviews: [Array],
      types: [Array]
    }
  },
  */

  // making the request for a specific restaurant
   //create an instance of Restaurant Card for each object
  //pass the object down as a prop

   // const place_id = "ChIJsx3CV9_dJIgRUN03zHb00gw"; // Replace with your place_id
  // const fields = "name,opening_hours";
  // const key = "YOUR_API_KEY"; // Replace with your API key

  // const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=${fields}&key=${key}`;

  // const response = await axios.get(url);
