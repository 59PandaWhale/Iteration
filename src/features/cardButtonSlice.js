import { createSlice } from '@reduxjs/toolkit';

const cardButtonSlice = createSlice({
  name: 'cardButton',
  initialState: {
    isClicked: true,
    restaurantInfo: null, // Set initial value to null
  },
  reducers: {
    toggleCardButton: (state, action) => {
      state.isClicked = !state.isClicked;
      state.isClicked ? state.restaurantInfo = action.payload : state.restaurantInfo = null; // Update restaurantInfo with the payload
    },
  },
});

export const { toggleCardButton } = cardButtonSlice.actions;
export default cardButtonSlice.reducer;
