import React, { useState } from 'react';
import '../styles/main.scss';
import { useDispatch, useSelector } from 'react-redux';
import ReviewContainer from './ReviewContainer.jsx';
import RestaurantDisplay from './RestaurantDisplay.jsx';
import RestaurantQuery from './RestaurantQuery.jsx';
import Container from '@mui/material/Container';
import Restaurant from './RestaurantProfile';
import RestaurantProfile from './RestaurantProfile';
{
  /* <h1>This is a header</h1>
<h2>This is a secondary header</h2>
<h3>This is a tertiary header</h3> */
}

function MainContainer() {
  // ONCLICK FUNCTIONALITY
  // if restaurantCard button is clicked, render rightDiv component
  const isCardButtonClicked = useSelector((state) => state.cardButton.isClicked); // Updated selector

  return (
    <Container id='mainContainer' disableGutters>
      <div className='mainDiv'>
        <h1>(rec(commend), res(taurants), next)</h1>
        <RestaurantQuery />
        <RestaurantDisplay />
      </div>
      {/* //write a conditional render onclick */}
      {isCardButtonClicked && <div className='rightDiv'><RestaurantProfile /></div>}
      {/* <div className='rightDiv'>
        <RestaurantProfile />
      </div> */}
    </Container>
  );
}
  

export default MainContainer;
