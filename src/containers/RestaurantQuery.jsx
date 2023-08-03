import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuery, resetQuery } from '../features/querySlice';
import { updateRest } from '../features/restaurantsSlice';
const axios = require('axios');

//import wobbe from '../frontend/assets/logo.png';

const RestaurantQuery = () => {
  // create an action for one drop-down
  const [question, setQuestion] = useState("");
  const [address, setAddress] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const query = useSelector((state) => state.query);
  const dispatch = useDispatch();
  const [submitClicked, setSubmitClicked] = useState(false);

  /*
- query will include all of the query selectors we need to filter our restaurants
- get request to restaurants with the query parameters
- call updateRest and set to new list of restaurants

*/
const formRef = useRef();


useEffect(() => {
  if (submitClicked) {
    setSubmitClicked(false); // reset the state after fetching
    
  }
}, [submitClicked, question]);

useEffect(() => {
  console.log(query)
}, [query])

const handleSubmit = async (event) => {
  if(query.state.length > 2){
    return window.alert('please insert two letters for State');
  }
  event.preventDefault();
  setSubmitClicked(true); // indicating that submit was clicked
  const group = query.good_for_groups===true ? ' that are good for groups': ''
  const vegan = query.plant_based===true ? ' and must have vegan options': ''
  // if(query.good_for_groups === true)
  const location = query.street + ', ' +query.city + ', ' +query.state; //creating the address to 
  const cuisine = query.cuisine;
  const distance = query.location_radius * 1000; //value in km so multiply by 1000
  const minRating = query.minRating;
  const price_level = query.price_tier;
  const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${process.env.REACT_APP_API_KEY}`;
  const geocodingResponse = await axios.get(geocodingUrl);
  console.log('Geocoding response:', geocodingResponse.data);  // Log the geocoding response
  const lat = geocodingResponse.data.results[0].geometry.location.lat;
  const lng = geocodingResponse.data.results[0].geometry.location.lng;
  const service = new window.google.maps.places.PlacesService(document.createElement('div'));
  service.textSearch({
    query: cuisine + 'restaurants' + group + vegan,
    location: { lat: lat, lng: lng },
    radius: distance, // Radius in meters
    minRating: minRating, // Minimum rating
    maxPriceLevel: price_level, // Maximum price level
  }, (results, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
       // Create an array of restaurant objects
       const restaurants = results.map(result => {
        return {
          name: result.name,
          address: result.formatted_address,
          isOpen: result.opening_hours ? result.opening_hours.open_now : undefined,
          rating: result.rating,
          priceLevel: result.price_level,
          placeId: result.place_id,
          numberOfratings: result.user_ratings_total
          // Add any other data you might find useful
        };
       })
      console.log(restaurants)
      dispatch(resetQuery());
      formRef.current.reset();
      // setRestaurants(results);
    }else{
      console.log('error in google api')
    }
  });
};

  return (
    <div>
      <script
        async
        src='//embedr.flickr.com/assets/client-code.js'
        charSet='utf-8'
      ></script>
      <form ref={formRef} className='queryFormContainer'>
        <label id='streetAddress' htmlFor='restaurant'>
          Street Address:
          <input
            placeholder='Where you at doe...'
            name='street'
            type='text'
            id='street'
            onChange={(e) => dispatch(updateQuery(['street', e.target.value]))}
          />
        </label>
        <label id='cityLabel' htmlFor='restaurant'>
          City:
          <input
            placeholder=''
            name='city'
            type='text'
            id='city'
            onChange={(e) => dispatch(updateQuery(['city', e.target.value]))}
          />
        </label>
        <label id='stateLabel' htmlFor='restaurant'>
          State:
          <input
            placeholder='h'
            name='state'
            type='text'
            id='state'
            onChange={(e) => dispatch(updateQuery(['state', e.target.value]))}
          />
        </label>
        <label className='dropDownLabel' htmlFor='cuisine'>
          Cuisine:
          <select
            className='dropDown'
            name='cuisine'
            id='cuisineSelector'
            onChange={(e) => dispatch(updateQuery(['cuisine', e.target.value]))}
          >
            <option value=''>Select</option>
            <option value='Mexican'>Mexican</option>
            <option value='Indian'>Indian</option>
            <option value='American'>American</option>
            <option value='Italian'>Italian</option>
            <option value='Chinese'>Chinese</option>
            <option value='Korean'>Korean</option>
            <option value='Japanese'>Japanese</option>
          </select>
        </label>
        <label className='dropDownLabel' htmlFor='ambience'>
          Min Rating:
          <select
            className='dropDown'
            name='minrating'
            id='ambienceSelector'
            onClick={(e) =>
              dispatch(updateQuery(['minrating', Number(e.target.value)]))
            }
          >
            <option value=''>Select</option>
            <option value='1'>1 Star</option>
            <option value='2'>2 Stars</option>
            <option value='3'>3 Stars</option>
            <option value='4'>4 Stars</option>
            <option value='5'>5 Stars</option>
          </select>
        </label>
        <label className='dropDownLabel' htmlFor='price-tier'>
          Price-Tier:
          <select
            className='dropDown'
            name='price-tier'
            id='priceSelector'
            onChange={(e) =>
              dispatch(updateQuery(['price_tier', Number(e.target.value)]))
            }
          >
            <option value=''>select</option>
            <option value='1'>Exquisite</option>
            <option value='2'>Splurge</option>
            <option value='3'>Affordable</option>
            <option value='4'>Thrifty</option>
            <option value='5'>Dirt Cheap</option>
          </select>
        </label>

        <label htmlFor='plantBase' className='dropDownLabel'>
          Vegetarian options?
          <select
            className='dropDown'
            name='plantBase'
            id='plantBase'
            onChange={(e) =>
              dispatch(updateQuery(['plant_based', Boolean(e.target.value)]))
            }
          >
            <option value=''>select</option>
            <option value='true'>Yes</option>
            <option value='false'>No</option>
          </select>
        </label>

        <label htmlFor='good_for_groups' className='dropDownLabel'>
          Good for Groups?
          <select
            className='dropDown'
            name='good_for_groups'
            id='good_for_groups'
            onChange={(e) =>
              dispatch(updateQuery(['good_for_groups', Boolean(e.target.value)]))
            }
          >
            <option value=''>select</option>
            <option value='true'>Yes</option>
            <option value='false'>No</option>
          </select>
        </label>

        <label htmlFor='locationRad' className='dropDownLabel'>
          Location Radius
          <select
            className='dropDown'
            name='Location'
            id='locationRadius'
            onChange={(e) =>
              dispatch(updateQuery(['location_radius', Number(e.target.value)]))
            }
          >
            <option value=''>select</option>
            <option value='2.5'>2.5 km</option>
            <option value='5'>5 km</option>
            <option value='10'>10 km</option>
            <option value='15'>15 km</option>
            <option value='20'>20 km</option>
          </select>
        </label>
         <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

// fields:
export default RestaurantQuery;

//example data from object
/*
{
  // Indicates the current operating status of the place, e.g. "OPERATIONAL"
  business_status: "OPERATIONAL",

  // The complete address for this place
  formatted_address: "44635 Schoenherr Rd, Sterling Heights, MI 48313, United States",

  // A collection of geographic data, including location coordinates and viewport
  geometry: {
    location: _.Qg,
    viewport: _.mi,
  },

  // Contains any attributions that must be displayed to the user according to the usage terms
  html_attributions: [],

  // The URL of a suggested icon representing this place
  icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",

  // The suggested background color for the icon
  icon_background_color: "#FF9E67",

  // The mask base URL of the place's icon
  icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet",

  // The name of the place
  name: "Eat Well Cafe",

  // The opening hours of the place
  opening_hours: {
    isOpen: function(l) {
      //...
    },
    // Indicates whether the place is currently open
    open_now: function() {
      //...
    }
  },

  // Array of photo objects related to the place, each containing a photo reference
  photos: [
    {
      height: 1080,
      html_attributions: [],
      width: 1081,
      getUrl: function() {
        //...
      }
    }
  ],

  // A unique identifier for the place
  place_id: "ChIJsx3CV9_dJIgRUN03zHb00gw",

  // Plus codes offer a way to share the location for places that do not have a specific street address
  plus_code: {
    compound_code: "J2F3+4H Sterling Heights, Michigan",
    global_code: "86JVJ2F3+4H"
  },

  // The place's price level, represented by a number (1-4)
  price_level: 1,

  // The place's rating, represented by a number (1.0 - 5.0)
  rating: 4.3,

  // A token used for place details request
  reference: "ChIJsx3CV9_dJIgRUN03zHb00gw",

  // An array of feature types describing the given place (e.g., 'restaurant', 'food', etc.)
  types: ["cafe", "restaurant", "food", "point_of_interest", "store", "establishment"],

  // The total number of user ratings for this place
  user_ratings_total: 116,

  // The offset from UTC of the place's location
  utc_offset: function() {
    //...
  }
}
*/