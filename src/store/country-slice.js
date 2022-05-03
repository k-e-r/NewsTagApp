import { createSlice } from '@reduxjs/toolkit';

const countrySlice = createSlice({
  name: 'country',
  initialState: { country: 'us' },
  reducers: {
    setCountry(state, action) {
      state.country = action.payload;
    },
  },
});

export const countryActions = countrySlice.actions;

export default countrySlice;
