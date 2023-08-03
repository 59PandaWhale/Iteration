import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  street: '',
  city:'',
  state:'',
  minrating: '',
  cuisine: '',
  price_tier: '',
  plant_based: '',
  location_radius: '',
  good_for_groups: '',
};

export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    updateQuery: (state, action) => {
      // action payload should be an array [query attricute, value]
      // invoke this function on onChange of the query selectors in Restaurant query --> i.e. onChange = (e) => dispatch(updateQuery(['ambience', e.target.value]))
      //  may have to ensure that value is a num/bit ?
      const attribute = action.payload[0];
      const value = action.payload[1];
      state[attribute] = value;
    },
    resetQuery: state => {
      // Reset state to initial state
      Object.assign(state, initialState); //added by yahya
    },
  },
});

export const { updateQuery, resetQuery } = querySlice.actions;
export default querySlice.reducer;
